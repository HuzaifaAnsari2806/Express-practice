const User = require("../models/User");
const { checkHashedPassword } = require("../services/hashPassword");
const { generateToken } = require("../services/auth");
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ data: users });
}

const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({ user });
}

const updateUser = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    await User.findByIdAndUpdate(id, data);
    res.status(200).json({ msg: "User updated" });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id)
    res.status(200).json({ msg: "User Deleted Successfully" });
}

const createUser = async (req, res) => {
    const { firstName, lastName, email, gender, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ firstName: firstName, email: email });
    if (user)
        res.status(400).json({ error: "User already exist" });
    else {
        const user = await User.create({
            firstName: firstName,
            email: email,
            lastName: lastName,
            gender: gender,
            password: hashedPassword
        });
        res.status(201).json({ message: "User created successfuly" })
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ msg: "Invalid email" });
    else {
        const isMatch = await checkHashedPassword(req.body.password, user.password);
        if (isMatch) {
            const token = generateToken(user);
            return res.status(201).json({ Name: user.firstName, email: user.email, token: token });
        }
        else {
            return res.status(400).json({ msg: "Invalid password" });
        }
    }

}


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser
}