import express from 'express';
const router = express.Router();
import { createUser, verfiyUser , google } from '../Controller/auth.controller.js';
import { updateUser , deleteUser , signOutUser , getUserListing ,getPropertyOwner } from '../Controller/userController.js';
import { createListing, deleteUserListing, updateListing , listingData , getListings} from '../Controller/listing.controller.js';
import VerifyToken from '../utils/validToken.js';

//authRouter
router.post('/google', google);
router.post('/sign-up', createUser);
router.post('/sign-in', verfiyUser);

//userRouter
router.post('/update/:id', VerifyToken , updateUser);
router.delete('/delete/:id' , VerifyToken , deleteUser);
router.get('/signout/:id' , signOutUser);
router.get('/listings/:id', getUserListing );
router.get('/:id', VerifyToken , getPropertyOwner);

//listingRouter
router.post('/create', createListing);
router.delete('/delete/listing/:id', deleteUserListing)
router.post('/update/listing/:id', updateListing);
router.get('/data/:id' , listingData);

//HomePageRouter
router.get('/all-listings/get', getListings);

export default router;