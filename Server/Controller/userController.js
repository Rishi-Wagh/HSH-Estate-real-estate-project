import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { sendError } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const updateUser = async (req , res , next) =>{

  try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id ,{
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avtar: req.body.avtar,
        }
    }, {new: true}) //new here saves with updated new info
    
    const {password , ...rest} = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error)
  }

}

export const deleteUser = async (req , res ,next) => {
 
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.clearCookie('token');
    res.status(200).json({msg:'user deleted'})
  } catch (error) {
    next(error)
  }
}

export const signOutUser = async(req , res , next) => {
  try {
    res.clearCookie('token');
    res.json({msg:'sign out'});
  } catch (error) {
    next(error)
  }
}

export const getUserListing = async(req , res , next) =>{
  try {
     
     const userListing = await Listing.find({ userRef: req.params.id });
     if(!userListing) return res.status(204).json({"message":"You have no listings!", "sucess": false});

     const page = parseInt(req.query.page);
     const limit = parseInt(req.query.limit);
    
     const startIndex = (page - 1) * limit;
     const endIndex = page * limit;
     
     const data = {};

     if(startIndex > 0 ){
       data.prevPage = {
        page: page - 1,
      }
     }
     
     data.result = userListing.slice(startIndex , endIndex);
    
     if(userListing.length > endIndex){
      data.nextPage = {
        page: page + 1,
       }
     }
     
     res.status(200).json(data);
    
  } catch (error) {
    next(error);
  }
}

export const getPropertyOwner = async (req, res , next) =>{
  try {
    const property = req.query.property;

    const validProperty = await User.find({_id: property});
    if(!validProperty) return sendError(res, 404, 'property owner not found');
    
    const propertyOwner = {};
    propertyOwner.name = validProperty[0].username;
    propertyOwner.email = validProperty[0].email;
    
    res.status(200).json(propertyOwner);

  } catch (error) {
    next(error);
  }
}