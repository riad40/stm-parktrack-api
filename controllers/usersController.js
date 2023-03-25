const User = require("../models/User")
const Role = require("../models/Role")

const getUsers = async (req, res) => {
    try {
        // get the super admin role id
        const superAdminRole = await Role.findOne({ name: "super admin" })

        // get all users except the super admin
        const users = await User.find({ roles: { $nin: superAdminRole._id } })
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = { getUsers }
