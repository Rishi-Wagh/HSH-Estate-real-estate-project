import { sendError } from "./error.js";
import User from "../models/user.model.js";


const VerifyToken = async (req , res , next) =>{

   try {
      const {id} = req.params;
      const validId = await User.findOne({_id: id});
      if(!validId) return sendError(res, 404 , "Invalid User");
      
      next();
   } catch (error) {
      next(error)
   }
   

}

export default VerifyToken