const authcontroller = require("../controller/authcontroller")
const verifytoken = require("../middleware/middleware")
const express = require("express")
const router = express.Router()


router.post("/signup",authcontroller.signup)
router.post("/login",authcontroller.login)
router.post("/logout",authcontroller.logout)
router.put("/update-profile",verifytoken,authcontroller.updateProfile)
router.get("/check",verifytoken,authcontroller.checkAuth)

module.exports = router