import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setformData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changeHandler = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log("Login executed", formData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            responseData = await response.json();
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
            return;
        }

        if (responseData.success) {
            console.log("Login successful:", responseData);
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            console.log("Login failed:", responseData);
            alert(responseData.errors);
        }
    }

    const signup = async () => {
        console.log("Sign Up executed", formData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            responseData = await response.json();
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again.");
            return;
        }

        if (responseData.success) {
            console.log("Sign Up successful:", responseData);
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            console.log("Sign Up failed:", responseData);
            alert(responseData.errors);
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Name" /> : <></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login</span></p> :
                    <p className="loginsignup-login">Don't have an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}

                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
