//import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";

function MovieCard({ movie }) {

   const { addToCart } = useCart();
   const navigate = useNavigate();

   function handlePurchase() {
      addToCart(movie);
      navigate("/checkout");
   }
   return (
      <div className="bg-dark text-light rounded-3 d-flex flex-column flex-md-row">
         <div className="h-100">
            <img style={{ width: 175 }}
               className="d-flex h-100 rounded-3 mx-auto mx-md-0 mt-2 mt-md-0"
               src={movie.poster}
               alt={movie.title + " poster"}
            />
         </div>
         <div className="p-4 flex-grow-1">
            <h2>{movie.title}</h2>
            <div className="d-flex">
               <p className="me-1">{movie.year}</p>
               <p className="me-1">|</p>
               <p>{movie.genres.map((g, i) => 
                  i === movie.genres.length - 1 ? g : g + ", ")}
               </p>
            </div>
            <p>{movie.description}
            </p>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
               <p className="m-0">
                  <strong>
                     {movie.price} {movie.currency}
                  </strong>
               </p>
               <div className="mt-2 mt-md-0">
                  <Link
                     to={"/movies/" + movie.id}
                     className="btn btn-light me-2">
                     Details
                  </Link>
                  <button
                     className="btn btn-primary"
                     disabled={movie.stock <= 0}
                     onClick={handlePurchase}>
                     Purchase
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default MovieCard;
