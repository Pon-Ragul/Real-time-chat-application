const usermodel = require("../model/usermodel")
const bcrypt = require("bcryptjs")
const generatetoken = require("../util/util")
const cloudinary = require("../lib/cloudinary")

const signup = async(req,res) => {
    const {fullName,email,password} = req.body
    try {
        if(password.length < 6){
            return res.status(400).json({msg:"Password must be atleast 6 characters"})
        }
        const user = await usermodel.findOne({email})
        if(user) {
            return res.status(400).json({msg:"Email already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new usermodel({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            await newUser.save()
            generatetoken(newUser._id,res)
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture
            })
        }
        else{
            res.status(400).json({msg:"Invalid user data"})
        }
    } 
    catch (error) {
        res.status(500).json({msg:error.message})
    }
}


const login = async(req,res) => {
    const {email,password} = req.body
    try {
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(401).json({msg:"Invalid credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({msg:"Invalid credentails"})
        }
        generatetoken(user._id,res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture
        })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


const logout = async(req,res) => {
    try {
        res.cookie("jwt","",{
            maxAge:0,
            httpOnly:true,
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
        })
        res.status(200).json({msg:"Logged out successfully"})

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

const updateProfile = async(req,res) => {
    try {
        const {profilePicture} = req.body
        const userId = req.user._id
        if(!profilePicture){
            return res.status(400).json({msg:"Profile pic is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updateUser = await usermodel.findByIdAndUpdate(userId,{profilePicture:uploadResponse.secure_url},{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


const checkAuth =(req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

module.exports = {signup,login,logout,updateProfile,checkAuth}