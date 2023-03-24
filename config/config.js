const mongoose = require("mongoose")

mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then(() => {
        console.log("connected succefully to stmParkTrack")
    })
    .catch((err) => {
        console.log(err)
    })
