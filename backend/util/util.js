const jwt = require("jsonwebtoken")

const generatetoken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000, 
        httpOnly : true, 
        sameSite : process.env.NODE_ENV === "production" ? "None" : "Lax", 
        secure : process.env.NODE_ENV === "production",
    })
    return token
}

module.exports = generatetoken