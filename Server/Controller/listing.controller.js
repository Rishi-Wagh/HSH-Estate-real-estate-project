import Listing from "../models/listing.model.js";
import { sendError } from "../utils/error.js";

export const createListing = async (req, res , next) => {
 try {
    
    const newListing = await Listing.create(req.body);
    return res.status(201).json(newListing);

 } catch (error) {
    next(error);
 }
}

export const deleteUserListing = async(req, res, next) => {
   const id = req.params.id;

   try {
      const deletedListing = await Listing.findByIdAndDelete(id);
      res.status(200).json({msg:'deleted the Listing'});
   } catch (error) {
      next(error);
   }
}

export const updateListing = async(req , res , next) => {

   const listing = await Listing.findById(req.params.id);
   if(!listing) return sendError(res, 404 , 'Listing not found');

   const ref = req.query.userRef;

   if(ref != listing.userRef) return sendError(res, 401, 'not a valid user to updtae the listing')

   try {
      const updatedlisting = await Listing.findByIdAndUpdate(req.params.id , req.body , { new: true});

      res.status(200).json(updatedlisting);
   } catch (error) {
      next(error);
   }

}

export const listingData = async (req, res, next) => {

   try {
      const reqListing = await Listing.find({_id: req.params.id});
   if(!reqListing) return sendError(res, 404 , "requested Listing not found");

   res.status(200).json(reqListing);
   } catch (error) {
      next(error)
   }
   
}

export const getListings = async (req, res, next) => {

   try {
      const limit = req.query.limit || 6;
      const startIndex = req.query.startIndex || 0;
      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';

      let offer = req.query.offer;
      if(offer === undefined || offer === 'false'){
         offer = { $in: [true , false]}
      }

      let furnished = req.query.furnished;
      if(furnished === undefined || furnished === 'false'){
         furnished = { $in: [true , false]}
      }
      
      let parking = req.query.parking;
      if(parking === undefined || parking === 'false'){
         parking = { $in: [true , false]}
      }
      
      let type = req.query.type;
      if(type === undefined || type === 'all'){
         type = { $in: ['sell' , 'rent']}
      }

      const listings = await Listing.find({
         name: { $regex: searchTerm , $options: 'i' },
         offer,
         furnished,
         parking,
         type,}).sort({[sort]: order})
         .limit(limit)
         .skip(startIndex);

      res.status(200).json(listings);
 

   } catch (error) {
      next(error);
   }
}