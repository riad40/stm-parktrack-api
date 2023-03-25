const express = require("express")
const router = express.Router()
const { getUsers } = require("../controllers/usersController")

const authChecker = require("../middlewares/authChecker")
const roleChecker = require("../middlewares/roleChecker")

router.get("/", authChecker, roleChecker(["super admin"]), getUsers)

module.exports = router
