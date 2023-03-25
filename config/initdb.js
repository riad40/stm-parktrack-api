const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")

const initDB = async () => {
    try {
        // create roles if they don't exist
        const rolesExist = await Role.countDocuments()
        if (!rolesExist) {
            const roles = process.env.ROLES.split(",")
            roles.forEach(async (role) => {
                const newRole = new Role({ name: role })
                await newRole.save()
            })
        }

        // create the super admin if it doesn't exist
        const superAdminExists = await User.countDocuments({
            username: process.env.SUPER_ADMIN_USERNAME,
        })
        if (!superAdminExists) {
            // get the roles ids from the database
            const superAdminRole = await Role.findOne({
                name: "super admin",
            })

            const userRole = await Role.findOne({
                name: "user",
            })

            // hash the super admin password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(
                process.env.SUPER_ADMIN_PASSWORD,
                salt
            )

            // create the super admin
            const superAdmin = new User({
                username: process.env.SUPER_ADMIN_USERNAME,
                email: process.env.SUPER_ADMIN_EMAIL,
                password: hashedPassword,
                roles: [superAdminRole._id, userRole._id],
            })
            await superAdmin.save()
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = initDB
