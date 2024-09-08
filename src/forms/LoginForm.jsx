import React, { useState } from "react";
import { redirect } from "react-router-dom";
import Alert from "../Alert";

function LoginForm({ login }) {
    const initialState = {
        username: "",
        password: "",
    }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    console.debug("LoginForm", "login=", typeof login);

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
            return redirect("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }))
    }

    return (
        <div className="LoginForm container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h3 className="mb-3">Login</h3>
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

                    {formErrors.length
                        ? <Alert messages={formErrors}/>
                        : null}

                    <button 
                        className="btn btn-primary float-right"
                        onSubmit={handleSubmit}
                    >Submit</button>
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default LoginForm;