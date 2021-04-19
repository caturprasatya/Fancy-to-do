const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.LOG_PASS)
}


module.exports = { generateToken }