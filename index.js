require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./Routes/user");
const authRoutes = require("./Routes/auth");
const sendMessage =require('./Routes/sendMessage')
const fetchMessage =require('./Routes/fetchMessage')
const Pusher = require("pusher");
const mongoose = require('mongoose')
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

 


//Pusher Implementation
const pusher = new Pusher({
    appId: "1587910",
    key: "f541a3c71d74a31ef08a",
    secret: "22995d1ca824d878c92b",
    cluster: "ap2",
    useTLS: true
  });


const db =mongoose.connection
 db.once("open",()=>{
   const msgCollection =db.collection("messages")
   const changestream = msgCollection.watch()
   changestream.on("change",(change)=>{
      if(change.operationType==="insert"){
         const messageDetails=change.fullDocument
         pusher.trigger('messages','inserted',
         {
            name:messageDetails.name,
            message:messageDetails.message,
            received:messageDetails.received
         }
         
         )

      }
      else{
         console.log("error pusher")
      }
   })
 })




// routes
app.use("/api/users", userRoutes);//Creating users
app.use("/api/auth", authRoutes);//Login for users
app.use("/api/messages/new",sendMessage);//send Message
app.use("/api/messages/sync",fetchMessage);//fetch Message




const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
