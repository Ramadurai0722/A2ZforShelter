// import React from 'react';
// import './Footer.css';
// import facebookIcon from '../Home/images/facebook.png';
// import twitterIcon from '../Home/images/twitter.png';
// import instagramIcon from '../Home/images/instagram.png';
// import gmailIcon from '../Home/images/gmail.png';
// import location from '../Home/images/location.png';

// const Footer = () => {
//   return (
//     <footer className="footer" id="footer">
//     <h1 className="footer-headingmain">A2Z For Shelter</h1>
//       <div className="footer-content">
//         <div className="footer-section">
//         <h2 className="footer-buy-heading">For Buyers</h2>
//           <ul className="footer-links">
//             <li><a href="#">Buy Construction Property</a></li>
//             <li><a href="#">House</a></li>
//             <li><a href="#">Catering Services</a></li>
//             <li><a href="#">Interior Products</a></li>
//             <li><a href="#">Land</a></li>
//           </ul>
//         </div>
//         <div className="footer-section">
//         <h2 className="footer-sell-heading">For Sellers</h2>
//           <ul className="footer-links2">
//             <li><a href="#">Sell Construction Property</a></li>
//             <li><a href="#">House</a></li>
//             <li><a href="#">PG Houses</a></li>
//             <li><a href="#">Home Interior</a></li>
//             <li><a href="#">Land</a></li>
//           </ul>
//         </div>
//         <div className="footer-section">
//           <h2 className="footer-contact-heading">Contact Us</h2>
//           <img src = {location} alt="loaction" className='location' />
//           <p className="footer-phone-number">Seran Nagar,Kavumpalayam,Coimbatore</p>
//           <p className="footer-phone-number">+123-456-7890</p>
//           <div className="footer-social-icons">
//             <a href="#" className="social-icon">
//               <img src={facebookIcon} alt="Facebook" />
//             </a>
//             <a href="#" className="social-icon">
//               <img src={twitterIcon} alt="Twitter" />
//             </a>
//             <a href="#" className="social-icon">
//               <img src={instagramIcon} alt="Instagram" />
//             </a>
//             <a href="#" className="social-icon">
//               <img src={gmailIcon} alt="Gmail" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



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
              <li><a href="#">House</a></li>
              <li><a href="#">Catering Services</a></li>
              <li><a href="#">Interior Products</a></li>
              <li><a href="#">Land</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-sell-heading">For Sellers</h2>
            <ul className="footer-links2">
              <li><a href="#">Sell Construction Property</a></li>
              <li><a href="#">House</a></li>
              <li><a href="#">PG Houses</a></li>
              <li><a href="#">Home Interior</a></li>
              <li><a href="#">Land</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-contact-heading">Contact Us</h2>
            <img src={location} alt="location" className='location' />
            <p className="footer-phone-number">Seran Nagar, Kavumpalayam, Coimbatore</p>
            <p className="footer-phone-number">+123-456-7890</p>
            <div className="footer-social-icons">
              <a href="#" className="social-icon">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="social-icon">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="#" className="social-icon">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="#" className="social-icon">
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
          <li><a href="/feedback">Feed back</a></li> 
           <li><a href="#">About Us</a></li>
             <li><a href="/pricetable">Buy Our Services</a></li>
               <li><a href="#">Sales Enquiry</a></li>
        </ul>
      </div>
      </footer>
    </>
  );
};

export default Footer;
