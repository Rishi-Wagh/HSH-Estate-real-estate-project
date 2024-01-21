import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/Auth.route.js';
import userRouter from './routes/Auth.route.js';
import listingRouter from './routes/Auth.route.js';
import allListingRouter from './routes/Auth.route.js';
import {errorHandler} from "./utils/error.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);
app.use('/api/home', allListingRouter )

//middlewear
app.use(errorHandler);

//Connection to db
 mongoose.connect(process.env.MONGO_URL)
   .then(() =>{
     console.log('connected to DB...')
   })
   .catch((err) => {
    console.log(err);
   })

//Connection to port   
app.listen(3000 , ()=>{
    console.log('running on 3000!')
})