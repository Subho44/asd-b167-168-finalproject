import React, { useEffect, useState } from "react";
import axios from "axios";

const dummyProducts = [
  {
    _id: "1",
    name: "iPhone 15",
    image: "http://localhost:5600/images/iphone.jpg",
    description: "Latest Apple smartphone",
    price: 70000,
    stock: 5
  },
  {
    _id: "2",
    name: "Samsung Galaxy S24",
    image: "http://localhost:5600/images/samsung.jpg",
    description: "Powerful Android phone",
    price: 65000,
    stock: 8
  },
  {
    _id: "3",
    name: "Laptop",
    image: "http://localhost:5600/images/laptop.jpg",
    description: "High performance laptop",
    price: 50000,
    stock: 4
  },
  {
    _id: "4",
    name: "Headphone",
    image: "http://localhost:5600/images/headphone.jpg",
    description: "Wireless headphone",
    price: 3000,
    stock: 10
  }
];

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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5600/api/products");

      if (Array.isArray(res.data) && res.data.length > 0) {
        setProducts(res.data);
      } else {
        setProducts(dummyProducts);
      }
    } catch (err) {
      console.log("Product fetch error:", err);
      setProducts(dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  const addtocart = (product) => {
    const existingcart = getSafeArray("cartitems");
    const findproduct = existingcart.find((item) => item._id === product._id);

    let updatedcart = [];

    if (findproduct) {
      updatedcart = existingcart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedcart = [...existingcart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cartitems", JSON.stringify(updatedcart));
    alert("Product added to cart");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">All Products</h1>
        <h4>Loading products...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Products</h1>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12">
            <h4>No products found</h4>
          </div>
        ) : (
          products.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card shadow h-100">
                <img
                  src={item.image || fallbackImage}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                  <h6>₹ {item.price}</h6>
                  <p>Stock: {item.stock}</p>

                  <button
                    className="btn btn-primary btn-block mt-auto"
                    onClick={() => addtocart(item)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}