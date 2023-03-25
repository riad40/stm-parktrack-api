const User = require("../models/User")

// make sure the user has the right role - Authorization

const roleChecker = (roles) => {
    return async (req, res, next) => {
        // get the user roles
        const userRoles = req.user.roles

        // get the roles from the database
        const dbRoles = await User.findById(req.user.id).populate("roles")

        // check if the user has the right role
        const hasRole = dbRoles.roles.some((role) => roles.includes(role.name))

        if (!hasRole) {
            return res.status(401).json({ message: "unauthorized" })
        }

        next()
    }
}

module.exports = roleChecker
