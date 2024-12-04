const express = require('express');
const { createUser, getUser, updateUser, deleteUser, getAllUsers, loginUser } = require('../controllers/userController');
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.route("/")
    .get(verifyToken, getAllUsers)
    .post(createUser);

// app.get("/api/users/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(user => user.id === id);
//     res.json(user);
// });

router.route("/:id")
    .get(verifyToken, getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route("/login")
    .post(loginUser,);

module.exports = router;