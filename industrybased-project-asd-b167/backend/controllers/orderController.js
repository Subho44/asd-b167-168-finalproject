const Order = require("../models/Order");
const Cart = require("../models/Cart");

//place order

exports.placeorder = async (req,res)=>{
    try{
        const cartItems = await Cart.find();
        if(cartItems.length === 0) {
            return res.status(400).json({message:"cart is empty"});
        }
        const totalAmount = cartItems.reduce(
            (total,item)=> total + item.price *item.quantity,0
        );

        const order = await Order.create({
            items: cartItems.map((item)=>({
                productId:item.productId,
                name:item.name,
                price:item.price,
                quantity:item.quantity
            })),
            totalAmount,
            paymentMethod:req.body.paymentMethod || "cash on delivery",
            paymentStatus:"Paid",
            orderStatus:"Processing"
        });
        await Cart.deleteMany();
        res.json(order);
    } catch(err) {
        console.error(err);
    }
};

//get all orders
exports.getOrders = async(req,res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    }catch(err) {
        res.json({message:"not order"});
    }
}
//update order status

exports.updateOrderstatus = async(req,res) => {
    try {
       

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {orderStatus:req.body.orderStatus},
            {new:true}
        );
        res.json(order)
    } catch (err) {
        console.error(err);
    }
};
