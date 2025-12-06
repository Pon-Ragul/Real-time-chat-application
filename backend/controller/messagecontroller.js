const Message = require("../model/messagemodel")
const UserModel = require("../model/usermodel")
const cloudinary = require("../lib/cloudinary")
const {io,getReceiverSocketId} = require("../lib/socket")

const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await UserModel.find({_id:{$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

const sendMessages = async(req,res) => {
    try {
        const {text,image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id
        let imageUrl
        if (!text && !image) {
            return res.status(400).json({ msg: "Message text or image is required" })
        }
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
        
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

module.exports = {getUsersForSidebar,getMessages,sendMessages}


