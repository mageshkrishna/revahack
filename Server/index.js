const express = require("express");
let app = express();
const mongoose = require("mongoose");
let cors = require('cors');


const router = require('./Controllers/login')
const Threadrouter = require('./Controllers/thread')

// Middlewares
// To get request body and converts to JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({orgin:["http://localhost:19006/"],credentials:true}));


app.use('/public/images',express.static('public/images'))


mongoose.connect("mongodb://127.0.0.1:27017/Direct").then(() => {
  console.log("Connected to DB");
});

app.use('/user',router);
app.use('/customer',router);
app.use('/customer',Threadrouter);

app.listen(5000, () => {
  
  console.log("Server listening at 5000");
});