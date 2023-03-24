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

router.post("/", createLog)
router.put("/:id", UpdateLog)
router.get("/", getLogs)
router.get("/:id", getLog)
router.delete("/:id", removeLog)
router.get("/user/:user", getLogsByUser)

router.param("id", (req, res, next, id) => {
    console.log("id: ", id)
    next()
})

router.param("user", (req, res, next, user) => {
    console.log("user: ", user)
    next()
})

module.exports = router
