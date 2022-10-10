import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoute from './api/routes/user.js';

const app = express();
const Port = process.env.PORT || 2000;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('db connected');
    })
  .catch((err) => {
    console.log(err);
  });


const corsOptions = {
  origin: 'https://test-livid-pi.vercel.app'
}  

// allow origin request from the url
app.use(cors(corsOptions));

// parse incoming body payload
app.use(express.json());

// parse incoming url payload ++++
app.use(express.urlencoded({extended: true}));


//user routes
app.use('/users', userRoute);


app.use((req, res)=>{
  res.json('wrong endpoint')
});

app.listen(Port, console.log('server started at port 2000')
);


