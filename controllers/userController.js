const User = require("../models/User");
const { generateToken } = require("../services/auth");

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
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
    });
    res.status(201).json({ msg: "User created successfully.", data: user })
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user)
        res.status(400).json({ msg: "Invalid username or password" });
    const token = generateToken(user);
    res.status(201).json({ Name: user.firstName, email: user.email, token: token })
}


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser
}