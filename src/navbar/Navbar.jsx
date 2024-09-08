import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../forms/UserContext";

/**
 * Site-wide navbar. Shows different options when logged in/out.
 * Logs user out using the logout function defined in App
 */
function Navbar({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser);

    function loggedInNav() {
        return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/companies">Companies</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/" onClick={logout}>Log out ({currentUser.first_name || currentUser.username})</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    function loggedOutNav() {
        return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="Navbar navbar navbar-expand-md">
            <NavLink className="navbar-brand" to="/">Homepage</NavLink>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
}

export default Navbar;