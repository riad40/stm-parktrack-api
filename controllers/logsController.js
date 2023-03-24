// create a new log
const createLog = async (req, res) => {
    res.send("create log")
}

// update a log
const UpdateLog = async (req, res) => {
    res.send("update log")
}

// get all logs
const getLogs = async (req, res) => {
    res.send("get all logs")
}

// get a log
const getLog = async (req, res) => {
    res.send("get a log")
}

// remove a log
const removeLog = async (req, res) => {
    res.send("remove a log")
}

// export the functions
module.exports = {
    createLog,
    UpdateLog,
    getLogs,
    getLog,
    removeLog,
}
