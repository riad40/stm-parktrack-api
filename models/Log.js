const mongoose = require("mongoose")
const logSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
        max: 255,
        min: 4,
    },
    timeIn: {
        type: Date,
        required: true,
    },
    timeOut: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Log", logSchema)
