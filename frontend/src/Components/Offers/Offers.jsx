import React from "react";
import './Offers.css'
import exclusive_image from '../Assets/offers.png'
const Offers = () =>{
    return(
        <div className="offers">
            <div className="offers-right">
                <img src={exclusive_image} alt=""  className="offers-image"/>
            </div>
           
        </div>
    )
}

export default Offers