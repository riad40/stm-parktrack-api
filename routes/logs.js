const express = require("express")
const router = express.Router()
const {
    createLog,
    UpdateLog,
    getLogs,
    getLog,
    removeLog,
    getAllLogsByUser,
} = require("../controllers/logsController")

const authChecker = require("../middlewares/authChecker")
const roleChecker = require("../middlewares/roleChecker")
const { validate } = require("../middlewares/bodyValidator")
const { getLogsById, getLogsByUser } = require("../middlewares/logs")

router.post(
    "/",
    validate("log"),
    authChecker,
    roleChecker(["super admin"]),
    createLog
)
router.put(
    "/:id",
    validate("log"),
    authChecker,
    roleChecker(["super admin"]),
    UpdateLog
)
router.get("/", authChecker, roleChecker(["super admin"]), getLogs)
router.get("/:id", authChecker, roleChecker(["super admin"]), getLog)
router.delete("/:id", authChecker, roleChecker(["super admin"]), removeLog)
router.get(
    "/user/:user",
    authChecker,
    roleChecker(["super admin", "user"]),
    getAllLogsByUser
)

router.param("id", getLogsById)

router.param("user", getLogsByUser)

module.exports = router
