import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () =>{

    const [state, serState] = useState("Login");

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an account? <span>Login</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup