const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const secret_key = process.env.SECRET_KEY

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret_key, { algorithm: 'HS256', expiresIn: '1d' });
}

module.exports = {
    generateToken
}