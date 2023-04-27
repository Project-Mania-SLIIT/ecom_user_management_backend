const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
//
const PORT = process.env.PORT || 5002;
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
const URL=process.env.MONGODB_URL;
//
mongoose.connect(URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
}); 
//connection to database
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connected");
});
//
const userRouter = require("./routes/user.routes.js");
app.use('/',userRouter);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})


