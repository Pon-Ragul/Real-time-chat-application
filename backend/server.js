const express = require("express")
const mongoose = require("mongoose")
const authrouter = require("./route/authroute")
const messagerouter = require("./route/messageroute")
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")
const { app,io, server } = require('./lib/socket.js');

dotenv.config({ path: path.join(__dirname, ".env") })

const cookieParser = require("cookie-parser")

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB")
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message)
})

app.use("/api/auth",authrouter)
app.use("/api/messages",messagerouter)


const PORT = process.env.PORT 
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})