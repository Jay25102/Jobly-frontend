import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import UserContext from "../forms/UserContext";

import Homepage from "../Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import EditProfileForm from "../forms/EditProfileForm";

/**
 * Site-wide routes. Some routes require a logged in user.
 */
function RouteManager({ login, signup }) {
    const {currentUser} = useContext(UserContext);
    console.debug("Routes", "login=", typeof login, "signup=", typeof signup);

    if (!currentUser) {
        return (
            <Routes>
                <Route exact path="/" element={<Homepage/>}/>
                <Route exact path="/login" element={<LoginForm login={login}/>}/>
                <Route exact path="/signup" element={<SignupForm signup={signup}/>}/>
                <Route path="/*" to="/login"/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>}/>
            <Route exact path="/companies" element={<CompanyList/>}/>
            <Route exact path="/companies/:handle" element={<CompanyDetail/>}/>
            <Route exact path="/jobs" element={<JobsList/>}/>
            <Route exact path="/login" element={<LoginForm login={login}/>}/>
            <Route exact path="/signup" element={<SignupForm signup={signup}/>}/>
            <Route exact path="/profile" element={<EditProfileForm/>}/>
        </Routes>
    )
}

export default RouteManager;