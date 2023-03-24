const mongoose = require("mongoose")
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 4,
    },
})

module.exports = mongoose.model("Role", roleSchema)
