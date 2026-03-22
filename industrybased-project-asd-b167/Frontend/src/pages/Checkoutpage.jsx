import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const getSafeArray = (key) => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw || raw === "undefined" || raw === "null") {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log(`${key} parse error:`, error);
    return [];
  }
};

const Checkoutpage = () => {
  const navigate = useNavigate();

  const [cartitems, setCartitems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const storedCart = getSafeArray("cartitems");
    setCartitems(storedCart);
  }, []);

  const totalprice = cartitems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = (e) => {
    e.preventDefault();

    if (cartitems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill all customer details");
      return;
    }

    const newOrder = {
      _id: Date.now().toString(),
      customerName,
      phone,
      address,
      paymentMethod,
      items: cartitems,
      totalAmount: totalprice,
      status: "Pending",
      orderDate: new Date().toLocaleString()
    };

    const existingOrders = getSafeArray("orders");
    const updatedOrders = [...existingOrders, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.removeItem("cartitems");

    alert("Order placed successfully");
    navigate("/orders");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Checkout Page</h1>

      {cartitems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No cart items found</h4>
          <Link to="/" className="btn btn-primary mt-3">
            Go To Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-7 mb-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Customer Details</h4>

              <form onSubmit={placeOrder}>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    className="form-control"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option>Cash on Delivery</option>
                    <option>UPI</option>
                    <option>Card Payment</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success btn-block">
                  Place Order
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5 mb-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Order Summary</h4>

              {cartitems.map((item) => (
                <div key={item._id} className="border-bottom pb-2 mb-3">
                  <h6>{item.name}</h6>
                  <p className="mb-1">Price: ₹ {item.price}</p>
                  <p className="mb-1">Quantity: {item.quantity}</p>
                  <p className="mb-1">
                    Subtotal: ₹ {item.price * item.quantity}
                  </p>
                </div>
              ))}

              <h5 className="mt-3">Total Price: ₹ {totalprice}</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkoutpage;