//import React from "react";

function Footer() {
   const date = new Date();
   return (
      <footer className="py-4 bg-dark text-light mt-auto">
         <p className="text-center m-0">Copyright &copy; - {date.getFullYear()} MovieStore</p>
         <p style={{fontSize: 12}} className="text-center m-0 fw-bold fst-italic">All rights reserved</p>
      </footer>
   );
}

export default Footer;
