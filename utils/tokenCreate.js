const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

module.exports.createToken = (id) => {
    return jwt.sign({ id }, "net ninja secret", { expiresIn: maxAge })
}


