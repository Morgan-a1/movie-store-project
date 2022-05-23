import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';

import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Orders from './components/Orders';
import OrderDetails from "./components/OrderDetails";
import Checkout from "./components/Checkout";

import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default App;
