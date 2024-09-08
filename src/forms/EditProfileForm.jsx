import React, { useState, useContext } from "react";
import Alert from "../Alert";
import JoblyApi from "../../api";
import UserContext from "./UserContext";


/**
 * Form for editing user profile.
 * 
 * Displays a form with values autofilled to current user data.
 * Once the form submits, the API is called to patch in the new
 * user information from the form. This also reloads the site
 */
function EditProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    console.debug(
        "EditProfileForm",
        "currentuser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed", saveConfirmed,
    )

    /**
     * Uses api to try to patch data to backend.
     * Reports any errors and if successful, sets new info
     * across the site.
     */
    async function handleSubmit(e) {
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };
        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } 
        catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(data => ({ ...data, password: ""}));
        setFormErrors([]);
        setSaveConfirmed(true);
        // triggers user info to reload
        setCurrentUser(updatedUser);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert messages={formErrors}/>
                            : null}
                        {saveConfirmed
                            ? <Alert type="success" messages={["updated successfully."]}/>
                            : null}

                        <button 
                            className="btn btn-primary btn-block mt-4"
                            onClick={handleSubmit}
                        >Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfileForm;