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
const roleChecker = require("../middlewares/roleChecker")

router.post("/", authChecker, roleChecker(["super admin"]), createLog)
router.put("/:id", authChecker, roleChecker(["super admin"]), UpdateLog)
router.get("/", authChecker, roleChecker(["super admin"]), getLogs)
router.get("/:id", authChecker, roleChecker(["super admin"]), getLog)
router.delete("/:id", authChecker, roleChecker(["super admin"]), removeLog)
router.get(
    "/user/:user",
    authChecker,
    roleChecker(["super admin", "user"]),
    getLogsByUser
)

router.param("id", (req, res, next, id) => {
    console.log("id: ", id)
    next()
})

router.param("user", (req, res, next, user) => {
    console.log("user: ", user)
    next()
})

module.exports = router
