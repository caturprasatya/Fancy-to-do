const jwt = require('jsonwebtoken');

function verifyLogin(token) {
    console.log(token);
    return jwt.verify(token, process.env.LOG_PASS)
}

module.exports = {
  verifyLogin
}