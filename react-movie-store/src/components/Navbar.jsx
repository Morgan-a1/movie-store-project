import { Link } from "react-router-dom";

import Cart from "./Cart";
import Help from "./Help";

function Navbar() {
   return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
         <div className="container-fluid">
            <Link className="navbar-brand"
                  to="/">MovieStore</Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link active"
                           aria-current="page"
                           to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link"
                           to="/movies">Movies</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link"
                           to="/orders">Orders</Link>
                  </li>
                  <li className="nav-item dropdown">
                     <Help />
                  </li>
               </ul>
               <Cart />
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
