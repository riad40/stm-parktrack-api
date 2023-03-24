const express = require("express")
const router = express.Router()
const {
    createLog,
    UpdateLog,
    getLogs,
    getLog,
    removeLog,
} = require("../controllers/logsController")

router.post("/", createLog)
router.put("/:id", UpdateLog)
router.get("/", getLogs)
router.get("/:id", getLog)
router.delete("/:id", removeLog)

router.param("id", (req, res, next, id) => {
    console.log("id: ", id)
    next()
})

module.exports = router
