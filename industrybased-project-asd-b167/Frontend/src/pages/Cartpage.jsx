import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const getSafeCart = () => {
  try {
    const raw = localStorage.getItem("cartitems");

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

const Cartpage = () => {
  const [cartitems, setCartitems] = useState([]);

  useEffect(() => {
    const storecart = getSafeCart();
    setCartitems(storecart);
  }, []);

  const updatecart = (updatedData) => {
    setCartitems(updatedData);
    localStorage.setItem("cartitems", JSON.stringify(updatedData));
  };

  const increaseqty = (id) => {
    const updatedcart = cartitems.map((item) =>
      item._id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updatecart(updatedcart);
  };

  const decreaseqty = (id) => {
    const updatedcart = cartitems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    updatecart(updatedcart);
  };

  const removeitem = (id) => {
    const updatedcart = cartitems.filter((item) => item._id !== id);
    updatecart(updatedcart);
  };

  const totalprice = cartitems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Cart Page</h1>

      {cartitems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your cart is empty</h4>
          <Link to="/" className="btn btn-primary mt-3">
            Go To Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="row">
            {cartitems.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    
                  />

                  <div className="card-body d-flex flex-column">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <h6>₹ {item.price}</h6>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      <b>Subtotal:</b> ₹ {item.price * item.quantity}
                    </p>

                    <div className="mb-3">
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => increaseqty(item._id)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn-warning mr-2"
                        onClick={() => decreaseqty(item._id)}
                      >
                        -
                      </button>

                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => removeitem(item._id)}
                      >
                        Remove
                      </button>
                    </div>

                    <Link to="/checkout" className="btn btn-dark mt-auto">
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-3 shadow-sm">
            <h4>Total Price: ₹ {totalprice}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cartpage;