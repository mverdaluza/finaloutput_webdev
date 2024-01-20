import React from "react";
import { Link } from "react-router-dom";
import './AdminFooter.css'
import footer_logo from '../../assets/styleslogo.png'
import facebook_icon from '../../assets/fb.png'
import instagram_icon from '../../assets/ig.png'
import pinterest_icon from '../../assets/pint.png'

const Footer = () =>{
    return(
        <div className="footer">
            <div className="footer-logo">
                <Link to="/"><img src={footer_logo} alt="" /></Link>
                <Link to="/"  style={{ textDecoration: "none" }} ><p>StyleSphere</p></Link>
            </div>
          
            <div className="footer-social-icon">
                <div className="footer-icons">
                    <img src={facebook_icon} alt="" />
                </div>

                <div className="footer-icons">
                    <img src={instagram_icon} alt="" />
                </div>

                <div className="footer-icons">
                    <img src={pinterest_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <p>Copyright @ 2024. All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default Footer