const express = require("express")
const verifytoken = require("../middleware/middleware")
const messagecontroller = require("../controller/messagecontroller")

const router = express.Router()

router.get("/users",verifytoken,messagecontroller.getUsersForSidebar)
router.get("/:id",verifytoken,messagecontroller.getMessages)
router.post("/send/:id",verifytoken,messagecontroller.sendMessages)

module.exports = router