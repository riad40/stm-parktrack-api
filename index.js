require("dotenv").config()
require("./config/config")
require("./config/initdb")()
const cors = require("cors")
const express = require("express")

const app = express()

// middlwares for handling or parsing and validating incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// cors middlware
app.use(cors((origin = process.env.CLIENT_URL), (credentials = true)))

const authRouter = require("./routes/auth")
const logsRouter = require("./routes/logs")
app.use("/api/auth", authRouter)
app.use("/api/logs", logsRouter)

const port = process.env.PORT

app.listen(port, (err) => {
    !err ? console.log("app running on port " + port) : console.log(err)
})

module.exports = app
