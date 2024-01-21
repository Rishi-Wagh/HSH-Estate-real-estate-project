import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/Auth.route.js';
import userRouter from './routes/Auth.route.js';
import listingRouter from './routes/Auth.route.js';
import allListingRouter from './routes/Auth.route.js';
import {errorHandler} from "./utils/error.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

//dynamic dir-name
const __dirname = path.resolve();

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);
app.use('/api/home', allListingRouter );

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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
