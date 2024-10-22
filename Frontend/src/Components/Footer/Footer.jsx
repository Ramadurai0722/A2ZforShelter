import React from 'react';
import './Footer.css';
import facebookIcon from '../Home/images/facebook.png';
import twitterIcon from '../Home/images/twitter.png';
import instagramIcon from '../Home/images/instagram.png';
import gmailIcon from '../Home/images/gmail.png';
import location from '../Home/images/location.png';

const Footer = () => {
  return (
    <>
      <footer className="footer" id="footer">
        <h1 className="footer-headingmain">A2Z For Shelter</h1>
        <div className="footer-content">
          <div className="footer-section">
            <h2 className="footer-buy-heading">For Buyers</h2>
            <ul className="footer-links">
              <li><a href="#">Buy Construction Property</a></li>
              <li><a href="/houseall">House - Rent and Sale</a></li>
              <li><a href="/pgall">PG- Gents and Ladies</a></li>
              <li><a href="/cementall">Cement Products</a></li>
              <li><a href="/stoneall">Stones Products</a></li>
              <li><a href="/sandall">Sands Products</a></li>
              <li><a href="/woodall">Woods Products</a></li>
              <li><a href="/pipewireall">Pipes and Wires</a></li>
              <li><a href="/steelall">Steel Products</a></li>
              <li><a href="/cateringall">Catering Services</a></li>
              <li><a href="/interiorall">Interior Products</a></li>
              <li><a href="/borewellall">BoreWell Details</a></li>
              <li><a href="/civilall">Civil Engineer Details</a></li>
              <li><a href="/floorplan">2D Design Plan</a></li>
              <li><a href="https://a2z-home-planner-design.netlify.app/">3D - Design Plan</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-sell-heading">For Sellers</h2>
            <ul className="footer-links2">
              <li><a href="/post">Sell Construction Property</a></li>
              <li><a href="/posthouse">House</a></li>
              <li><a href="/pgHostel">PG Houses</a></li>
              <li><a href="/interiorpost">Home Interior</a></li>
              <li><a href="/Landpost">Land Sale</a></li>
              <li><a href="/cementpost">Cement Sale</a></li>
              <li><a href="/sandpost">Sand Sale</a></li>
              <li><a href="/steelpost">Steel Sale</a></li>
              <li><a href="/stonepost">Stone Sale</a></li>
              <li><a href="/woodpost">Wood Sale</a></li>
              <li><a href="//Pipe&wires">Pipes and Wires Sale</a></li>
              <li><a href="/cateringpost">Catering Sale</a></li>
              <li><a href="/borewellpost">BoreWell Details</a></li>
              <li><a href="/civilpost">Civil Engineering Register</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-contact-heading">Contact Us</h2>
            <img src={location} alt="location" className='location' />
            <p className="footer-phone-number">13A, Railway mens colony, Jayanthi Nagar,</p>
            <p className="footer-phone-number">Koundampalayam, Coimbatore,</p>
            <p className="footer-phone-number">Tamil Nadu - 641030</p>
            <p className="footer-phone-number">+91 90428 40201</p>

            <div className="footer-social-icons">
              <a href="https://www.facebook.com/asglobalsofttech" className="social-icon">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/asglobalsofttech/" className="social-icon">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="mailto:asglobalsofttech23@gmail.com" className="social-icon">
                <img src={gmailIcon} alt="Gmail" />
              </a>
            </div>
          </div>
        </div>

        {/* Additional section for Terms, Policy, etc. */}
        <div className="footer-extra">
          <ul className="footer-extra-links">
            <li><a href="/terms&condition">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contactus">Contact Us</a></li>
            <li><a href="/feedback">Feedback</a></li> 
            <li><a href="/about">About Us</a></li>
            <li><a href="/pricetable">Buy Our Services</a></li>
            {/* <li><a href="#">Sales Enquiry</a></li> */}
          </ul>
        </div>

    
      </footer>
          {/* Copyright and Developed By Section */}
          <div className="footer-bottom">
  <div className="footer-left">
    <p>Copyright © {new Date().getFullYear()} A2Z For Shelter. All rights reserved.</p>
  </div>
  <div className="footer-right">
    <p>Designed and Developed by AS Global Softtech</p>
  </div>
  </div>

    </>



  );
};

export default Footer;