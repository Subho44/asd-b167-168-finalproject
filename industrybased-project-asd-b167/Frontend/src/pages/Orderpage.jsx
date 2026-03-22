import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const fallbackImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#f1f3f5"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-size="24">
        No Image
      </text>
    </svg>
  `);

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

const Orderpage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = getSafeArray("orders");
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Order Page</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No orders found</h4>
          <Link to="/" className="btn btn-primary mt-3">
            Go To Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="mb-3">Order ID: {order._id}</h5>

                  <p>
                    <strong>Customer Name:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Order Date:</strong> {order.orderDate}
                  </p>
                  <h6 className="mt-3">
                    <strong>Total Amount:</strong> ₹ {order.totalAmount}
                  </h6>

                  <hr />

                  <h5>Ordered Items</h5>

                  {order.items.map((item) => (
                    <div key={item._id} className="border rounded p-2 mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || fallbackImage}
                          alt={item.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            marginRight: "10px",
                            borderRadius: "5px"
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                          }}
                        />

                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="mb-1">Price: ₹ {item.price}</p>
                          <p className="mb-1">Quantity: {item.quantity}</p>
                          <p className="mb-1">
                            Subtotal: ₹ {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orderpage;