const Cart = require("../models/Cart");

//add to cart

exports.addToCart = async(req,res) => {
    try {
        const {productId,name,image,price} = req.body;
        const existingItem = await Cart.findOne({productId});

        if(existingItem) {
            existingItem.quantity +=1;
            await existingItem.save();
            return res.json(existingItem);
        }
        const cartItem = await Cart.create({
            productId,
            name,
            image,
            price,
            quantity:1
        });
        res.json(cartItem);
    } catch (err) {
        console.error(err);
    }
};

//all cart view
exports.getCartItems = async(req,res) => {
    try {
        const items = await Cart.find();
        res.json(items);
    } catch (err) {
        console.error(err);
    }
};
//update cart quantity
exports.updateCartQuantity = async(req,res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;

        const item = await Cart.findByIdAndUpdate(
            id,
            {quantity},
            {new:true}
        );
        res.json(item)
    } catch (err) {
        console.error(err);
    }
};

//remove cart

exports.removecartitem = async(req,res) => {
    try {
        
    await Cart.findByIdAndDelete(
           req.params.id
        );
        res.json({message:"item removed"});
    } catch (err) {
        console.error(err);
    }
};
//clear cart
exports.clearcart = async(req,res) => {
    try {
        
    await Cart.deleteMany( );
        res.json({message:"cart cleared"});
    } catch (err) {
        console.error(err);
    }
};