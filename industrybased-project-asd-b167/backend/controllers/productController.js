const Product = require("../models/Product");

const sampleProducts = [
  {
    name: "iPhone 15",
    image: "https://picsum.photos/id/1/400/300",
    price: 70000,
    description: "Latest Apple smartphone",
    stock: 5
  },
  {
    name: "Samsung Galaxy S24",
    image: "https://picsum.photos/id/20/400/300",
    price: 65000,
    description: "Powerful Android phone",
    stock: 8
  },
  {
    name: "Laptop",
    image: "https://picsum.photos/id/180/400/300",
    price: 50000,
    description: "High performance laptop",
    stock: 4
  },
  {
    name: "Headphone",
    image: "https://picsum.photos/id/1080/400/300",
    price: 3000,
    description: "Wireless headphone",
    stock: 10
  }
];

// manual seed
exports.addProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    const products = await Product.insertMany(sampleProducts);
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Products not inserted",
      error: err.message
    });
  }
};

// get all products + auto seed if empty
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      await Product.insertMany(sampleProducts);
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Products not found",
      error: err.message
    });
  }
};