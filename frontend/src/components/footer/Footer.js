
import React from "react";
import './footer.css'

const Footer = ()=>{
    return (
       <div className="footer">
            <div className="row-footer row-footer-1">
                <h5>About</h5>
                <p>Contact us</p>
                <p>About us</p>
                <p>Careers</p>
                <p>Press</p>
            </div>
            <div className="row-footer row-footer-2">
                <h5>CONSUMER POLICY</h5>
                <p>Return policy</p>
                <p>Term of policy</p>
                <p>Security</p>
                <p>Privacy</p>
            </div>
            <div className="row-footer row-footer-3">
                <h5>Social</h5>
                <p>Instagram</p>
                <p>Facebook</p>
                <p>You tube</p>
                <p>Linkden</p>
            </div>
       </div>
    )
}

export default Footer;