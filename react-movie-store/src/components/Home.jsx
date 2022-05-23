//import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import Errors from "./Errors";
import { useCart } from "../contexts/CartContext";

function Home() {
   const [loading, setLoading] = useState(true);
   const [featured, setFeatured] = useState();
   const [movies, setMovies] = useState([]);
   const [errors, setErrors] = useState(null);

   const { addToCart } = useCart();
   const navigate = useNavigate();

   useEffect(() => {
      fetch("http://localhost:8000/api/movies")
         .then((res) => {
            return res.json();
         })
         .then((json) => {
            if (json.status === 200) {
               setMovies(json.data.slice(0, 4));
               setFeatured(json.data[Math.floor(Math.random() * json.data.length)]);
            }
            else {
               setErrors(json.errors ?? ["Could not fetch movies"]);
            }
            setLoading(false);
         })
         .catch((err) => {
            setErrors(["Could not fetch movies"]);
            setLoading(false);
         })
   }, []);

   function handlePurchase() {
      addToCart(featured);
      navigate("/checkout");
   }

   if (loading) return <Spinner />;
   if (errors) return <Errors errors={errors} />;

   return (
      <div>
         <div className="row p-2 text align-content-sm-center">
            <div className="col-md-6 p-4 order-1 order-md-0">
               <h1 className="mb-4">{featured.title}</h1>
               <div className="d-flex flex-column flex-md-row fw-bold">
                  <p className="m-0 me-md-1">{featured.year}</p>
                  <p className="me-1 d-none d-md-block">|</p>
                  <p>
                     {featured.genres.map((g, i) => 
                        i === featured.genres.length - 1 ? g : g + ", "
                     )}
                  </p>
               </div>
               <p>
                  {featured.description}
               </p>
               <p>
                  <strong>
                     {featured.price} {featured.currency}
                  </strong>
               </p>
               <button
                  className="btn btn-primary"
                  disabled={featured.stock <= 0}
                  onClick={handlePurchase}>
                  Purchase
               </button>
            </div>
            <div className="col-md-6 p-4">
               <Link
                  to={"/movies/" + featured.id}>
                  <img className="d-block mx-auto rounded-3"
                     src={featured.poster}
                     alt={featured.title + " poster"}
                     width="270">
                  </img>
               </Link>
            </div>
         </div>
         <div className="row justify-content-center">
            {movies.map((movie) => (
               <Card key={movie.id} movie={movie} />
            ))}
         </div>
      </div>
   );
}

function Card({movie}) {
   return (
      <Link to={"/movies/" + movie.id}
         className="my-2 col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
         <img className="rounded-3"
            src={movie.poster}
            alt={movie.title + " poster"}
            width="200">
         </img>
      </Link>
   );
}

export default Home;
