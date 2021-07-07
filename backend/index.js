require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Route = require("./routes/Route")

//dB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>
    console.log("Oops ERROR!!")
)

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// //routes
app.use("/api", Route);



//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
});