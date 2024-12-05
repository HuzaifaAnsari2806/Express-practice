const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const auth_header = req.headers["authorization"];
        if (!auth_header || !auth_header.startsWith("Bearer ")) {
            return res.status(400).json({ error: "Please provide a valid token" });
        }

        const token = auth_header.split("Bearer ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.id);

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = {
    verifyToken
}