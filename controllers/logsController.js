const Log = require("../models/Log")
const { validationResult } = require("express-validator")
const dateValidator = require("../utils/dateValidator")

// create a new log
const createLog = async (req, res) => {
    // get the log data from the request body
    const { licensePlate, timeIn, timeOut, user } = req.body

    // check if there are validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // check if timeOut is not null
    if (timeOut !== "") {
        // check if timeIn is before timeOut
        if (!dateValidator(timeIn, timeOut)) {
            return res
                .status(400)
                .json({ message: "timeIn must be before timeOut" })
        }
    }

    try {
        // create a new log
        const log = new Log({
            licensePlate,
            timeIn,
            timeOut,
            user,
        })

        // save the log
        await log.save()

        // send the response
        res.status(201).json({ message: "log created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// update a log
const UpdateLog = async (req, res) => {
    // get the log data from the request body
    const { licensePlate, timeIn, timeOut, user } = req.body

    // check if there are validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // check if timeOut is not null
    if (timeOut !== "") {
        // check if timeIn is before timeOut
        if (!dateValidator(timeIn, timeOut)) {
            return res
                .status(400)
                .json({ message: "timeIn must be before timeOut" })
        }
    }

    // get the log id from the request.log
    const { _id } = req.log

    try {
        // update the log
        const log = await Log.findByIdAndUpdate(
            _id,
            {
                licensePlate,
                timeIn,
                timeOut,
                user,
            },
            { new: true }
        )

        // send the response
        res.status(200).json({ message: "log updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// get all logs
const getLogs = async (req, res) => {
    // get all logs
    try {
        const logs = await Log.find().populate("user")
        res.status(200).json(logs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// get a log
const getLog = async (req, res) => {
    // get the log id from the request.log
    res.send(req.log)
}

// remove a log
const removeLog = async (req, res) => {
    // get the log id from the request.log
    const { _id } = req.log
    try {
        const log = await Log.findByIdAndDelete(_id)
        res.status(200).json({ message: "log deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// get logs by user
const getAllLogsByUser = async (req, res) => {
    // get the user id from the request.logs
    res.send(req.logs)
}

// get current log
const getCurrentLogs = async (req, res) => {
    // get all the logs that have the timeOut field empty
    try {
        const logs = await Log.find({ timeOut: null }).populate("user")
        res.status(200).json(logs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// export the functions
module.exports = {
    createLog,
    UpdateLog,
    getLogs,
    getLog,
    removeLog,
    getAllLogsByUser,
    getCurrentLogs,
}
