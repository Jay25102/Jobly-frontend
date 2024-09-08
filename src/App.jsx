import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import JoblyApi from '../api';
import RouteManager from './route-manager/RouteManager';
import Navbar from "./navbar/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./forms/UserContext";
import { decodeToken } from "react-jwt";
import LoadingSpinner from "./LoadingSpinner";
import "bootstrap/dist/css/bootstrap.css";

// token for localstorage
export const TOKEN_STORAGE_ID = "jobly-token";

/**
 * Contains navbar and routes as well as a context that
 * passes down user and job application status down to the
 * rest of the components.
 * 
 */
function App() {
  // user state to keep track of what user is logged in if at all
  const [currentUser, setCurrentUser] = useState(null);
  // used to keep track of whether or not the page is fully loaded
  const [infoLoaded, setInfoLoaded] = useState(false);
  // what applications the user has already applied for
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  // token for logged in users. Read from localstorage and used for auth
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  )

  /**
   * fetches user info from the api only after there is one logged in with
   * a token. Runs again when the token is changed
   */
  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem laoding", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);
    
  // logs user out by removing currentUser and their token
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /**
   * Makes a call to the api to sign up a user with credentials
   * in signupData. Sets their token afterwards which effectively
   * logs them in. This is passed down to the signup form component.
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /**
   * Similar to signup and is passed down to the login form comp.
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // check if job has already been applied to
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  // Apply to a job and update the list of applied jobs
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner/>

  return (
    <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <Navbar logout={logout}/>
        <RouteManager login={login} signup={signup}/>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
