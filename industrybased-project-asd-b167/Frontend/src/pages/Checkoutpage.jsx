import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const getSafeorder = (key) => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw || raw === "undefined" || raw === "null") {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("Cart parse error:", error);
    return [];
  }
};

const Checkoutpage = () => {
  const navigate = useNavigate();
  const [cartitems, setCartitems] = useState([]);
  const [customername, setCustomername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("Cash on Delivery");

  useEffect(() => {
    const storecart = getSafeorder(cartitems);
    setCartitems(storecart);
  }, []);

  const totalprice = cartitems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeorder = (e) => {
    e.preventDefault();
    if (cartitems.length == 0) {
      alert("your cart is empty");
      return;
    }
    const neworder = {
      _id: Date.now().toString(),
      customername,
      address,
      phone,
      paymentmethod,
      items: cartitems,
      totalAmount: totalprice,
      status: "pending",


    };

    const existingorders = getSafeorder("orders");
    const updatedorders = [...existingorders, neworder];
    localStorage.setItem("orders", JSON.stringify(updatedorders));
    localStorage.removeItem("cartitems");
    alert("order placed successfully");
    navigate("/orders");
  }

  return <>
    <div className="container mt-4">
      <h1 className="mb-4">Checkout Page</h1>

      
      
          <div className="row">
            <div className='col-md-7 mb-4'>
              <div className='card shadow-sm p-4'>
                <h4 className='mb-3'>Customer Details</h4>
                <form onSubmit={placeorder}>
                  <div className='form-group'>
                    <label>Customer name: </label>
                    <input
                      type='text'
                      className='form-control'
                      value={customername}
                      onChange={(e) => setCustomername(e.target.value)}
                      placeholder='enter full name'
                    />
                  </div>

                  <div className='form-group'>
                    <label>Phone Number: </label>
                    <input
                      type='text'
                      className='form-control'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='enter phn no'
                    />
                  </div>
                  <div className='form-group'>
                    <label>Delivery Address: </label>
                    <textarea
                      type='text'
                      className='form-control'
                      rows={4}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='enter address'
                    ></textarea>
                  </div>
                  <div className='form-group'>
                    <label>Payment method: </label>
                    <select
                      className='form-control'
                      value={paymentmethod}
                      onChange={(e) => setPaymentmethod(e.target.value)}
                    >
                      <option>Cash on Delivery</option>
                      <option>UPI</option>
                      <option>Card Payment</option>
                    </select>
                  </div>
                  <button type='submit' className='btn btn-danger'>
                    Place Order
                  </button>
                </form>
              </div>

            </div>
           
           <div className='col-md-5 mb-4'>
            <div className='card shadow-sm p-4'>
              <h4 className='mb-3'>Order Summary</h4>
               {cartitems.map((x)=>(
              <div>
               <h6>{x.name}</h6>
               <p className='mb-1'>Price:₹{x.price}</p>
               <p className='mb-1'>Quantity:₹{x.quantity}</p>
               <p className='mb-1'>
                 <b>Subtotal:</b> ₹ {item.price * item.quantity}
               </p>

              </div>       
          
               ))}
            </div>
           </div>

          </div>

          <div className="card p-3 shadow-sm">
            <h4>Total Price: ₹ {totalprice}</h4>
          </div>
       
    </div>


  </>
}

export default Checkoutpage