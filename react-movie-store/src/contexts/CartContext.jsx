import { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "./cartReducer";

export const types = {
   ADD: "ADD",
   REMOVE: "REMOVE",
   CLEAR: "CLEAR",
   CALCULATE_TOTAL: "CALCULATE_TOTAL",
   OPEN: "OPEN",
   CLOSE: "CLOSE",
   TOGGLE: "TOGGLE",
};

const Cart = createContext({
   state: {
      movies: [],
      totalAmount: "0.00",
      isOpen: false,
   },
   dispatch: () => {},
   addToCart: (movie) =>{},
   clearCart: () => {},
   removeFromCart: (movieId) => {},
   openCart: () => {},
   closeCart: () => {},
   toggleCart: () => {},
});

function CartContext({ children }) {
   const [state, dispatch] = useReducer(cartReducer, {
      movies: JSON.parse(localStorage.getItem("cartMovies")) || [],
      totalAmount: "0.00",
      isOpen: false,
   });
   // const [state, dispatch] = useReducer(cartReducer, {
   //    movies: [],
   //    totalAmount: "0.00",
   // });

   useEffect(() => {
      localStorage.setItem("cartMovies", JSON.stringify(state.movies));
   }, [state.movies]);

   useEffect(() => {
      calculateTotal();
   }, []);

   function addToCart(movie) {
      dispatch({ type: types.ADD, payload: movie });
      calculateTotal();
   }

   function removeFromCart(movie) {
      dispatch({ type: types.REMOVE, payload: movie });
      calculateTotal();
   }

   function clearCart() {
      dispatch({ type: types.CLEAR });
   }

   function calculateTotal(movie) {
      dispatch({ type: types.CALCULATE_TOTAL });
   }

   function openCart() {
      dispatch({ type: types.OPEN });
   }

   function closeCart() {
      dispatch({ type: types.CLOSE });
   }

   function toggleCart() {
      dispatch({ type: types.TOGGLE });
   }

   return (
      <Cart.Provider
      value={{
         state,
         dispatch,
         addToCart,
         clearCart,
         removeFromCart,
         calculateTotal,
         openCart,
         closeCart,
         toggleCart,
      }}>
      {children}
      </Cart.Provider>
   );
}

export function useCart() {
   const context = useContext(Cart);
   if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider ('CartContext')");
   }
   return context;
}

export default CartContext;
