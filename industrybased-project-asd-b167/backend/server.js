const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require('./config/db');
const productroutes = require("./routes/productRoutes");
const orderroutes = require("./routes/orderRoutes");
const cartroutes = require("./routes/cartRoutes");
const authroutes = require("./routes/authRoutes");
dotenv.config();
connectdb();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products",productroutes);
app.use("/api/cart",cartroutes);
app.use("/api/orders",orderroutes);
app.use("/api/auth",authroutes);

app.get("/",(req,res)=>{
    res.send("API IS WORKING...");
});

const port = process.env.PORT || 5600;
app.listen(port,()=>{
    console.log("server is running port 5600");
});
