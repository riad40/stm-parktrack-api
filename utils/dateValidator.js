// validate timeIn and timeOut dates
const dateValidator = (timeIn, timeOut) => {
    // check if timeIn is before timeOut
    if (timeIn < timeOut) {
        return true
    }
    return false
}

module.exports = dateValidator
