const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema =mongoose.Schema({
    message: String,
    name:String,
    timestamp:{
        type:Date,
        default:Date.now
    },
    received:Boolean
})

 module.exports= mongoose.model('messages',MessageSchema)