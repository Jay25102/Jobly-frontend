import React, { useState } from "react";
import { redirect } from "react-router-dom";
import Alert from "../Alert";

/**
 * Form to register a new user.
 * 
 * When submitted, calls signup function prop defined in App
 * then redirects to /companies
 */
function SignupForm({signup}) {
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    )

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            return redirect("/companies");
        }
        else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ... data, [name]: value}));
    }

    return (
        <div className="SignupForm container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h3 className="mb-3">Sign Up</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {formErrors.length
                                ? <Alert type="danger" messages={formErrors}/>
                                : null}

                        <button 
                            className="btn btn-primary float-right" 
                            type="submit" 
                            onSubmit={handleSubmit}
                        >Submit</button>
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default SignupForm;