import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Errors from "./Errors";

function Movies() {
   const [loading, setLoading] = useState(true);
   const [movies, setMovies] = useState([]);
   const [errors, setErrors] = useState(null);

   useEffect(() => {
      fetch("http://localhost:8000/api/movies")
         .then((res) => res.json())
         .then((json) => {
            if (json.status === 200) {
               setMovies(json.data);
            }
            else {
               setErrors(json.errors ?? ["Could not fetch movies"]);
            }
            setLoading(false);
         })
         .catch((err) => {
            setErrors(["Could not fetch movies"]);
            setLoading(false);
         });
   }, []);

   // if (loading) return (
   //    <div className="d-flex justify-content-center">
   //       <div className="spinner-border"
   //          style={{width: "3rem", height: "3rem"}}
   //          role="status">
   //          <span className="visually-hidden">Loading...</span>
   //       </div>
   //    </div>
   // )
   // else if (errors && errors.length > 0)
   //    return errors.map((e, i) => (
   //       <div key={i} className="alert alert-danger">
   //          <h4 className="alert-heading">Error!</h4>
   //          <p>{e}</p>
   //       </div>
   //    ));

   if (loading) return (<Spinner size={2}></Spinner>);
   if (errors) return (<Errors errors={errors}></Errors>);

   return (
      <div>
         <h1>Movies</h1>
         {movies.map((movie) => (
            <div key={movie.id} className="my-3">
               <MovieCard movie={movie} />
            </div>
         ))} 
      </div>
   );
}

export default Movies;
