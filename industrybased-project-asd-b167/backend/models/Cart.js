const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    quantity:{type:Number,default:1}

},
{timestamps:true}

);
module.exports = mongoose.model("Cart",cartSchema);