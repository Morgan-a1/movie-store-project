import { types } from "./CartContext";

export function cartReducer(state, action) {
   switch (action.type) {
      case types.ADD:
         return {
            ...state,
            movies: addOrUpdate(state.movies, action.payload),
         };
      case types.REMOVE:
         return {
            ...state,
            movies: state.movies.filter(
               (m) => m.id !== action.payload.id),
         };
      case types.CLEAR:
         return {
            ...state,
            movies: [],
            totalAmount: "0.00",
         };
      case types.CALCULATE_TOTAL:
         return {
            ...state,
            totalAmount: calculateTotal(state.movies),
         };
         case types.OPEN:
            return {
               ...state,
               isOpen: true,
            };
         case types.CLOSE:
            return {
               ...state,
               isOpen: false,
            };
         case types.TOGGLE:
            return {
               ...state,
               isOpen: !state.isOpen,
            };
      default:
         return state;
   }
}

function calculateTotal(movies) {
   return movies
      .reduce((total, m) => total + m.price * m.quantity, 0)
      .toFixed(2);
}

function addOrUpdate(movies, movie) {
   const index = movies.findIndex((m) => m.id === movie.id);

   if (index === -1) {
      return [...movies, { ...movie, quantity: 1 }];
   }
   else {
      return [
         ...movies.slice(0, index),
         { ...movies[index], quantity: movies[index].quantity + 1 },
         ...movies.slice(index + 1),
      ];
   }
}
