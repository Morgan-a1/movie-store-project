import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
   const [orderId, setOrderId] = useState("");
   const navigate = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();
      
      if (orderId && orderId !== "") {
         navigate("/orders/" + orderId);
      }  
   }

   return (
      <div>
         <h1>Orders</h1>
         <form onSubmit={handleSubmit}>
            <div className="input-group">
               <input
                  type="text"
                  className="form-control form-control-lg"
                  id="orderId"
                  name="orderId"
                  placeholder="Order ID"
                  aria-label="Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)} />
               <button
                  className="btn btn-outline-dark"
                  type="submit">
                  Get Order
               </button>
            </div>
            <div className="form-text">
               Please enter your order id - 24 digits.
            </div>
         </form>
      </div>
   );
}

export default Orders;
