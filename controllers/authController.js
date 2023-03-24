const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// login function
const login = async (req, res) => {
    // get the user data from the request body
    const { email, password } = req.body

    try {
        // check if the user exists
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "user does not exist" })
        }

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
            { id: userExist._id, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // send the response && set the token in authorization header
        res.status(200)
            .header("authorization", `Bearer ${token}`)
            .json({ message: "user logged in successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

// register function
const register = async (req, res) => {
    // get the user data from the request body
    const { username, email, password } = req.body

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
            role: userRole._id,
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
    res.send("logout")
}

// export the functions
module.exports = {
    login,
    register,
    logout,
}
