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
        // validate add log request body
        case "log": {
            return [
                body("licensePlate").exists(),
                body("timeIn").exists(),
                body("timeOut").exists(),
                body("user").exists(),
            ]
        }
    }
}

module.exports = { validate }
