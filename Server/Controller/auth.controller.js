import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  jwt from "jsonwebtoken";
import { sendError } from "../utils/error.js";

export const createUser = async (req , res , next) =>{
    const {username , email , password} = req.body;
    
    const hashedpass = bcryptjs.hashSync(password , 10);

    const newUser = new User({username , email , password: hashedpass});
    try {
        await newUser.save();
        res.json('user created');

    } catch (error) {
        next(error);
    }
        
}

export const verfiyUser = async(req , res , next) =>{
    const {email , password} = req.body;
  
    try {
    const validUser = await User.findOne({email});
    if(!validUser) return sendError(res, 404 , 'User not found');

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if(!validPass) return sendError(res, 404 , 'Wrong credentials');
    
    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET)
    const {password: pass , ...rest} = validUser._doc;
    res
      .cookie('token' , token , {httpOnly: true})
      .status(200)
      .json(rest);
        
    } catch (error) {
        next(error)
    }
}

export const google = async(req, res, next) =>{
    try {
   const user = await User.findOne({email: req.body.email});
   if(user) {
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       const {password: pass , ...rest} = user._doc;

       res
       .cookie('token' , token , {httpOnly: true})
       .status(200)
       .json(rest);
   } else {

     const generatedPassword = Math.random().toString(36).slice(-8);
     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
     const {name , email , photo} = req.body;
     const newUser = new User({username: name, email , password: hashedPassword , avtar: photo});
     await newUser.save();

     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
     const {password: pass , ...rest} = newUser._doc;
     res
      .cookie('token' , token , {httpOnly: true})
      .status(200)
      .json(rest);
   }
        
    } catch (error) {
      next(error)  
    }
}