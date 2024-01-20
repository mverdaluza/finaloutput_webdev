import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './AdminLoginSignup.css';

const AdminLoginSignup = () => {
    const navigate = useNavigate();

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const adminSignup = async () => {
        console.log("Admin Sign Up executed", formData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/adminsignup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            responseData = await response.json();
        } catch (error) {
            console.error("Error during admin signup:", error);
            alert("An error occurred during signup. Please try again.");
            return;
        }

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate("/");
        } else {
            alert(responseData.errors);
        }
    };

    const adminLogin = async () => {
        console.log("Admin Login executed", formData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/adminlogin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            responseData = await response.json();
        } catch (error) {
            console.error("Error during admin login:", error);
            alert("An error occurred during login. Please try again.");
            return;
        }

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate("/");
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Name" /> : <></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? adminLogin() : (state === "Sign Up" ? adminSignup() : adminSignup()) }}>{state === "Sign Up" || state === "Login" ? "Continue" : "Admin Continue"}</button>
                {(state === "Sign Up" || state === "Login") ? (state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login</span></p> :
                    <p className="loginsignup-login">Don't have an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>) :
                    (state === "Admin Sign Up" ? <p className="loginsignup-login">Already have an admin account? <span onClick={() => { setState("Admin Login") }}>Admin Login</span></p> :
                        <p className="loginsignup-login">Don't have an admin account? <span onClick={() => { setState("Admin Sign Up") }}>Click Here</span></p>)
                }

                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginSignup;
