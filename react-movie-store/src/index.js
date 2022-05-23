import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import CartContext from './contexts/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContext>
        <App />
      </CartContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
