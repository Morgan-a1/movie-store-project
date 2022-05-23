import { useLocation } from "react-router-dom";
//import { useState } from "react";

import Portal from "./Portal";

function Help() {
   const location = useLocation();
   const locLen = location.pathname.length;
   const startChar = location.pathname[1];

   let locName = "";
   let helpText = "";

   if (locLen > 0) {
      if (locLen === 1) {
         locName = "Home";
         helpText =
            `This is the home page of Movie Store where we present
            one random movie as featured and a quartet that's
            ranked top four at IMDb. \r You can click on any movie
            to get more detailed info.`;
      }
      else if (startChar === 'm') {
         if (locLen === 7) {
            locName = "Movies";
            helpText =
               `Here you can choose to either buy or get more
               detailed information about our movies.`;
         }
         else {
            locName = "Movie details";
            helpText =
               `Here you can read more thoroughly about your movie
               of choice and add it to the cart if you so wish.`;
         }
      }
      else if (startChar === 'o') {
         if (locLen === 7) {
            locName = "Orders";
            helpText = 
               `Here you can recall the details about your latest
               purchase simply by entering measly 24 irregular digits.`;
         }
         else {
            locName = "Order details";
            helpText = 
               `Here you get the information about your latest
               purchase.`;
         }
      }
      else if (startChar === 'c') {
         if (location.pathname[2] === 'h') {
            locName = "Checkout";
            helpText = 
               `Here you fill in your name, email and address. Every
               field is mandatory so fill in the form as good as you
               can.`;
         }
         /*else {
            locName = "Contact us";
            helpText =
               `Here you fill in your contact data and the message
               you want to send us.`;
         }*/
      }
   } // end if (locLen > 0)

   return (
      <div>
         <button
            style={{ border: 0 }}
            className="nav-link dropdown-toggle bg-light mb-1"
            id="navbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Help
         </button>
         <ul
            className="dropdown-menu mt-0 mb-4"
            aria-labelledby="navbarDropdown">
            <li>
               <button
                  className="ms-2 bg-transparent"
                  style={{ border: 0 }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#about"
                  aria-controls="about"
                  >About
                  <span className="visually-hidden">About</span>
               </button>
            </li>

            <li className="ms-2 nav-item">
               <a href="mailto:morgan_a1@hotmail.com"
                  style=
                     {{ textDecoration: "none", color: "black", padding: 4 }}>
                  Contact us
               </a>
            </li>

            <li><hr className="dropdown-divider" /></li>
            <li>
               <button
                  className="ms-2 bg-transparent"
                  style={{ border: 0 }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#help"
                  aria-controls="help"
                  >Help
                  <span className="visually-hidden">Help</span>
               </button>
            </li>
         </ul>

         <Portal>
            <div
               className="offcanvas offcanvas-top text-center card"
               tabIndex="-1"
               id="about"
               aria-labelledby="aboutLabel"
               >
               <div>
                  <h4 className="text-center mt-2" id="aboutLabel">
                     About this app
                     <span
                        type="button"
                        className="btn-close text-reset float-end"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close">
                     </span>
                  </h4>
               </div>
               <div className="container offcanvas-body">
                  <div className="row justify-content-center">
                     <div className=" col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
                           An API demo app with an e-commerce theme. Developed
                           at Lexicon in Linköping, Sweden.
                     </div>
                  </div>
               </div>
            </div>
            <div
               className="offcanvas offcanvas-bottom text-center card"
               tabIndex="-1"
               id="help"
               aria-labelledby="aboutLabel"
               >
               <div>
                  <h4 className="text-center mt-2" id="aboutLabel">
                     Help on {locName}
                     <span
                        type="button"
                        className="btn-close text-reset position-absolute end-0"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close">
                     </span>
                  </h4>
               </div>
               <div className="container offcanvas-body">
                  <div className="row justify-content-center">
                     <div className=" col-10 col-sm-10 col-md-7 col-lg-6 col-xl-5 text-center">
                        {helpText}
                     </div>
                  </div>
               </div>
            </div>
         </Portal>
      </div>
   ); // end return()

}

export default Help;
