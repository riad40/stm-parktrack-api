const { body } = require("express-validator/check")

// validate the request body
const validate = (method) => {
    switch (method) {
        // validate the login request body
        case "login": {
            return [
                body("email").exists().isEmail(),
                body("password").isLength({ min: 4 }),
            ]
        }
        // validate the register request body
        case "register": {
            return [
                body("username").exists(),
                body("email").exists().isEmail(),
                body("password").isLength({ min: 4 }),
            ]
        }
    }
}

module.exports = { validate }
