// Hero.jsx
import React from "react";
import './Hero.css'
import hero_image from '../Assets/newbanner.png'

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-right">
                <img src={hero_image} alt="" className="hero-image" />
            </div>
        </div>
    )
}

export default Hero;
