const express = require("express")
const router = express.Router()
const {
    createLog,
    UpdateLog,
    getLogs,
    getLog,
    removeLog,
    getLogsByUser,
} = require("../controllers/logsController")

const authChecker = require("../middlewares/authChecker")

router.post("/", authChecker, createLog)
router.put("/:id", authChecker, UpdateLog)
router.get("/", authChecker, getLogs)
router.get("/:id", authChecker, getLog)
router.delete("/:id", authChecker, removeLog)
router.get("/user/:user", authChecker, getLogsByUser)

router.param("id", (req, res, next, id) => {
    console.log("id: ", id)
    next()
})

router.param("user", (req, res, next, user) => {
    console.log("user: ", user)
    next()
})

module.exports = router
