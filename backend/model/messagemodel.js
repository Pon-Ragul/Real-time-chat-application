const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    senderId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required : true
    },
    receiverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required : true
    },
    text : String,
    image : String
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

module.exports = Message