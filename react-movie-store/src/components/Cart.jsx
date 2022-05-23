import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";

import Portal from "./Portal";
import { useCart, types as cartTypes } from "../contexts/CartContext";

function Cart() {
   const {
      state: { movies, isOpen },
      clearCart,
      openCart,
      closeCart,
      dispatch,
   } = useCart();

   const location = useLocation();

   const offcanvasRef = useRef(undefined);
   const bsOffcanvasRef = useRef(undefined);

   useEffect(() => {
      if (bsOffcanvasRef.current) {
         if (isOpen) bsOffcanvasRef.current.show();
         else bsOffcanvasRef.current.hide();
      }
   }, [isOpen]);

   useEffect(() => {
      function onShow(e) {
         e.preventDefault();
         openCart();
      }
      function onHide(e) {
         e.preventDefault();
         closeCart();
      }

      if (offcanvasRef.current && bsOffcanvasRef.current) {
         offcanvasRef.current.addEventListener("show.bs.offcanvas", onShow);
         offcanvasRef.current.addEventListener("hide.bs.offcanvas", onHide);
      }

      return () => {
         if (offcanvasRef.current && bsOffcanvasRef.current) {
            offcanvasRef.current.removeEventListener("show.bs.offcanvas", onShow);
            offcanvasRef.current.removeEventListener("hide.bs.offcanvas", onHide);
         }
      };
   }, [openCart, closeCart]);

   useEffect(() => {
      dispatch({ type: cartTypes.CLOSE });
   }, [location, dispatch]);

   function setRefs(el) {
      if (el) {
         offcanvasRef.current = el;
         bsOffcanvasRef.current =
            window.bootstrap.Offcanvas.getOrCreateInstance(el);
      }   
   }

   return (
      <>
         <button
            className="btn btn-dark btn-sm ms-auto position-relative"
            data-bs-toggle="offcanvas"
            data-bs-target="#cart"
            aria-controls="cart"
            >
            <HiOutlineShoppingCart size={20} />
            <span className="visually-hidden">Cart</span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {movies.length}
               <span className="visually-hidden">number of movies in cart</span>
            </span>
         </button>
         <Portal>
            <div
               className="offcanvas offcanvas-end"
               tabIndex="-1"
               id="cart"
               aria-labelledby="cartLabel"
               ref={(el) => setRefs(el)}
               >
               <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="cartLabel">
                     Cart
                  </h5>
                  <button
                     className="btn btn-link text-danger"
                     onClick={() => clearCart()}>Clear Cart
                  </button>
                  <button
                     type="button"
                     className="btn-close text-reset"
                     data-bs-dismiss="offcanvas"
                     aria-label="Close">
                  </button>
               </div>
               <div className="offcanvas-body d-flex flex-column">
                  {movies.map((m) =>
                     (<CartItem key={m.id} movie={m} />))}
                  <Link
                     to="/checkout"
                     className="btn btn-primary mt-auto">
                     Go to checkout
                  </Link>
               </div>
            </div>
         </Portal>
      </>
   );
}

function CartItem({ movie }) {
   const { removeFromCart } = useCart();

   return (
      <p className="d-flex justify-content-between">
         <span>
            <Link
               to={"/movies/" + movie.id}
               className="text-dark">
               {movie.title}
            </Link>
            <strong>&nbsp;&times;{movie.quantity}</strong>
         </span>
         <span className="d-flex align-items-center">
            <strong>
               {(parseFloat(movie.price) * movie.quantity).toFixed(2)}
               &nbsp;{movie.currency}
            </strong>
            <FaTimes
               className="ms-1 bg-danger text-light rounded"
               role="button"
               title="Remove from Cart"
               onClick={() => removeFromCart(movie)}
            />
         </span>
      </p>
   );
}

export default Cart;
