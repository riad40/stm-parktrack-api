// login function
const login = async (req, res) => {
    res.send("login")
}

// register function
const register = async (req, res) => {
    res.send("register")
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
