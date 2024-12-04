const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const auth_header = req.headers["authorization"];
    if (!auth_header)
        res.status(400).json({ error: "Please provide token" });
    const token = auth_header.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = User.findById(decoded.id)
    next();
}

module.exports = {
    verifyToken
}