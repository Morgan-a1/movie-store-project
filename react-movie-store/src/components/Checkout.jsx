import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";

function Checkout() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [street, setStreet] = useState("");
   const [city, setCity] = useState("");
   const [country, setCountry] = useState("");
   const [state, setState] = useState("");
   const [zip, setZip] = useState("");

   const {
      state: { movies, totalAmount },
      clearCart,
   } = useCart();

   const navigate = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();
      const body = JSON.stringify({
         user: {
            firstName,
            lastName,
            email,
            address: {
               street,
               city,
               country,
               state,
               zip,
            },
         },
         movies: movies.map((m) => ({
            movieId: m.id,
            quantity: m.quantity,
         })),
      });

      fetch("http://localhost:8000/api/orders/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body,
      })
      .then((res) => res.json())
      .then((json) => {
         if (json.status === 201) {
            console.log(json);
            clearCart();
            navigate("/orders/" + json.data._id);
         }
         else {
            alert("Could not create order, server message: " + json.status);
         }
      })
      .catch((err) => {
         alert("Could not create order, error:" + err);
      });
   }

   function isDisabled() {
      if (
         !firstName ||
         !lastName ||
         !email ||
         !street ||
         !country ||
         !state ||
         !zip ||
         (movies.length <= 0)
      ) return true;

      return false;
   }

   return (
      <form onSubmit={handleSubmit} className="mb-4">
         <h1>Checkout</h1>
         <div className="row mt-4 p-3 p-md-0">
            <div className="col-12 col-md-7 p-0 pe-md-4 mb-4 mb-md-0">
               <h2 className="mb-4">Billing Details</h2>
               <div className="row">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First name"
                        aria-label="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                  </div>
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last name"
                        aria-label="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </div>
               </div>
               <div className="mt-4">
                  <input
                     type="email"
                     className="form-control"
                     name="email"
                     placeholder="Email"
                     aria-label="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="mt-4">
                  <input
                     type="text"
                     className="form-control"
                     name="street"
                     placeholder="Street"
                     aria-label="Street"
                     value={street}
                     onChange={(e) => setStreet(e.target.value)}
                  />
               </div>
               <div className="row mt-4">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        aria-label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </div>
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Country"
                        aria-label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                     />
                  </div>
               </div>
               <div className="row mt-4">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder="State"
                        aria-label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                     />
                  </div>
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        name="zip"
                        placeholder="Zip"
                        aria-label="Zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                     />
                  </div>
               </div> 
            </div>
            <div className="col-12 col-md-5 p-0 ps-md-4">
               <h2 className="mb-4">Order Review</h2>
               {movies.map((movie) => (
                  <p key={movie.id} className="d-flex justify-content-between">
                     <span>
                        {movie.title}
                        <strong>&nbsp;&times; {movie.quantity}</strong>
                     </span>
                     <strong>
                        {(parseFloat(movie.price) * movie.quantity).toFixed(2)}
                        &nbsp;{movie.currency}
                     </strong>
                  </p>
               ))}
               <hr />
               <p className="d-flex justify-content-between">
                  Subtotal
                  <strong>{totalAmount} SEK</strong>
               </p>
               <p className="d-flex justify-content-between">
                  Shipping
                  <strong>FREE</strong>
               </p>
               <hr />
               <p className="d-flex justify-content-between">
                  Total
                  <strong>{totalAmount} SEK</strong>
               </p>
               <button
                  disabled={isDisabled()}
                  type="submit"
                  className="btn btn-primary mt-4 d-block w-100">
                  Purchase
               </button>
            </div>
         </div>
      </form>
   );
}

export default Checkout;
