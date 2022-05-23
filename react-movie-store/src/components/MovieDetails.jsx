import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Errors from "./Errors";
import Spinner from "./Spinner";
import { useCart } from "../contexts/CartContext";

function MovieDetails() {
   const { movieId } = useParams();
   const [loading, setLoading] = useState(true);
   const [movie, setMovie] = useState();
   const [errors, setErrors] = useState(null);

   const { addToCart, openCart } = useCart();
   const navigate = useNavigate();

   function handlePurchase() {
      addToCart(movie);
      navigate("/checkout");
   }

   function handleAddToCart() {
      addToCart(movie);
      openCart();
   }

   useEffect(() => {
      fetch("http://localhost:8000/api/movies/" + movieId)
         .then((res) => res.json())
         .then((json) => {
            switch (json.status) {
               case 200:
                  setMovie(json.data);
                  break;
               case 404:
                  setErrors(["Movie not found"]);
                  break;
               default:
                  setErrors(json?.error ?? ["Could not fetch movie"]);
                  break;
            }
         })
         .catch(() => setErrors(["Could not fetch movie"]))
         .finally(() => setLoading(false));
   }, [movieId]);

   if (loading) return (<Spinner size={2}></Spinner>);
   if (errors) return (<Errors errors={errors}></Errors>);

   return (
      <div className="mb-4">
         <div className="row mb-4">
            <div className="col order-1 order-md-0">
               <h1>{movie.title}</h1>
               <p>
                  <span>{movie.year}</span>
                  <span className="mx-2">|</span>
                  <span>{movie.genres.map((g, i) => 
                        i === movie.genres.length - 1 ? g : g + ", ")}
                  </span>
               </p>
               <p>
                  <span>{movie.director}</span>
                  <span className="mx-2">|</span>
                  <span>{movie.length} minutes</span>
               </p>
               <p className="text-secondary">{movie.plot}</p>
               <p>{movie.stars.map((s, i) => 
                  i === movie.stars.length - 1 ? s : s + ", ")}
               </p>
               <div className="badge bg-warning py-2 mb-4">
                  <a className="text-dark"
                     href={movie.imdbUrl}
                     target="_blank"
                     rel="noreferrer noopener">
                     <strong>IMDb {movie.imdbRating.toFixed(1)}</strong>
                  </a>
               </div>
            </div>
         
            <div className="col-12 col-md-5 d-flex justify-content-center align-items-start">
               <img
                  className="rounded img-fluid"
                  style={{ maxHeight: "75vh", width: "250px" }}
                  src={movie.poster}
                  alt={movie.title + " poster"}
               />
            </div>

            
         </div>
         <div className="card text-white bg-dark text-center mt-4">
            <div className="card-body">
               <h5 className="card-title">
                  {movie.price} <strong>{movie.currency}</strong>
               </h5>
               {movie.stock > 0 ? (
                  <small className="fst-italic" style={{ color: "#61d684" }}>
                     <strong>In Stock</strong>
                  </small>
               ) : (
                  <small className="fst-italic" style={{ color: "#e78181" }}>
                     <strong>Out of Stock</strong>
                  </small>
               )}
               <div className="d-flex justify-content-center mt-3">
                  <button
                     className="btn btn-primary mx-2"
                     disabled={movie.stock <= 0}
                     onClick={handlePurchase}>
                     Purchase
                  </button>
                  <button
                     className="btn btn-light mx-2"
                     disabled={movie.stock <= 0}
                     onClick={handleAddToCart}>
                     Add to cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
// minHeight: "30vh, minWidth: "30vh"

export default MovieDetails;
