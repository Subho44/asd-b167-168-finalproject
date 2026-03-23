const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

//register(send otp)
exports.register = async(req,res)=>{
    const {name,email} = req.body;
    const otp = Math.floor(100000 +Math.random()*900000).toString();
     let user = await User.findOne({email});

     if(!user) {
        user = new User({name,email});
     }
     user.otp = otp;
     user.otpExpire = Date.now() + 5*60*1000;
     await user.save();
     await sendEmail(email,otp);
     res.json({message:"otp sent to email"});

};

//verify otp
exports.verifyotp = async(req,res)=>{
    const {email,otp} = req.body;

    const user = await User.findOne({email});

     if(!user || user.otp !== otp) {
        return res.status(400).json({message:"invalid otp"});
     }

     if(user.otpExpire < Date.now()){
         return res.status(400).json({message:"OTP expired"});
     }

     user.isVerified = true;
     user.otp = null;
     await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
     res.json({message:"Login success",token});

};
