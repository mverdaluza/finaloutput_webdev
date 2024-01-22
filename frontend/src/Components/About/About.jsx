import React from "react";
import {Link} from "react-router-dom";
import './About.css';
import applogo from '../Assets/logo.png'

const About = () =>{
    return(
        <div className="about">
            <div className="about-container">
                <h1>About Us</h1>
                <Link to='/'><img src={applogo} alt="" className="app-logo" /></Link>
                <p>Welcome to StyleSphere, where elegance meets comfort for the modern 
                    woman. Explore our curated collection of exquisite tops, bottoms, 
                    and dresses designed to elevate your style effortlessly. Embrace 
                    the confidence that comes with our fashion-forward pieces,
                    carefully selected to cater to the diverse tastes of women. 
                    From timeless classics to the latest trends, StyleSphere is your 
                    go-to destination for fashion that empowers. Indulge in the 
                    perfect blend of sophistication and comfort, because at 
                    StyleSphere, we believe every woman deserves to feel beautiful 
                    every day. Discover your style, embrace your essence, and make 
                    a statement with StyleSphere.</p>
            </div>
        </div>
    )
}

export default About