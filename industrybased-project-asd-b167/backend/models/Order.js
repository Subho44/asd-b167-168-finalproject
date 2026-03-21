const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
     items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                name: { type: String, required: true },
                price: { type: String, required: true },
                quantity: { type: Number, default: 1 }

            }
           ],
           totalAmount:{ type: Number, required:true },
           paymentMethod:{ type: String, default:"Cash On Delivery"},
           paymentStatus:{ type: String, default:"Paid"},
           orderStatus:{ type: String, default:"Processing"},
     },
    { timestamps: true }

);
module.exports = mongoose.model("Order", orderSchema);