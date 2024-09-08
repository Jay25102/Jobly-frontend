import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./forms/UserContext";
import "./Homepage.css";

/**
 * Website's hompage
 * 
 * Either shows the welcome message if the user is logged in
 * or shows the login/register links
 */
function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);
    
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <div className="lead">All the jobs in one, convenient place.</div>
                {currentUser
                    ? <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
                    : (
                        <div>
                            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">Login</Link>
                            <Link className="btn btn-primary font-weight-bold" to="/signup">Sign Up</Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Homepage;