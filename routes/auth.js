const express = require("express")
const router = express.Router()
const {
    login,
    logout,
    register,
    verify,
} = require("../controllers/authController")
const { validate } = require("../middlewares/bodyValidator")

router.post("/login", validate("login"), login)
router.post("/register", validate("register"), register)
router.get("/logout", logout)
router.get("/", verify)

module.exports = router
