const Log = require("../models/Log")

const getLogsById = async (req, res, next, id) => {
    try {
        const log = await Log.findById(id)
        if (!log) {
            return res.status(404).json({ message: "log not found" })
        }

        req.log = log
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const getLogsByUser = async (req, res, next, user) => {
    try {
        const logs = await Log.find({ user }).populate("user")
        if (!logs) {
            return res.status(404).json({ message: "no logs with that user" })
        }

        req.logs = logs
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { getLogsById, getLogsByUser }
