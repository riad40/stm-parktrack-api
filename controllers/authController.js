const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

// login function
const login = async (req, res) => {
    // get the user data from the request body
    const { email, password } = req.body

    // check if there are validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // check if the user exists
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "user does not exist" })
        }

        // get the user roles
        const roles = await Role.find({ _id: { $in: userExist.roles } })

        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
            password,
            userExist.password
        )
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        // create the token
        const token = jwt.sign(
            { id: userExist._id, roles: userExist.roles },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // send the response && set the token in authorization header
        res.status(200)
            .header("authorization", `Bearer ${token}`)
            .json({
                message: "user logged in successfully",
                token,
                user: {
                    id: userExist._id,
                    username: userExist.username,
                    email: userExist.email,
                    roles: roles.map((role) => role.name),
                },
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// register function
const register = async (req, res) => {
    // get the user data from the request body
    const { username, email, password } = req.body

    // check if there are validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // check if the user already exists
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "user already exists" })
        }

        // get the user role id
        const userRole = await Role.findOne({ name: "user" })

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create the user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            roles: [userRole._id],
        })
        await user.save()

        // send the response
        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// logout function
const logout = async (req, res) => {
    try {
        // clear the token from the authorization header
        res.status(200)
            .header("authorization", "")
            .json({ message: "user logged out successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// verify function
const verify = async (req, res) => {
    try {
        // get the token from the authorization header
        const token = req.header("authorization").split(" ")[1]

        // check if the token exists
        if (!token) {
            return res.status(401).json({ verified: false })
        }

        // verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // get the user roles
        const roles = await Role.find({ _id: { $in: verified.roles } })

        // send the response
        res.status(200).json({
            verified: true,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ verified: false })
    }
}

// export the functions
module.exports = {
    login,
    register,
    logout,
    verify,
}
