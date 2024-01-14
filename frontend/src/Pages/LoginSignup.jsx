import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () =>{

    const [state, setState] = useState("Login");
    const [formData, setformData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changeHandler = (e) =>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const login = async ()=>{
        console.log("Login executed",formData);
    }

    const signup = async ()=>{
        console.log("Sign Up executed",formData);
    }
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>:
                <p className="loginsignup-login">Don't have an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup