const express = require('express');
const { createUser, getUser, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.route("/")
    .get(getAllUsers)
    .post(createUser);

// app.get("/api/users/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(user => user.id === id);
//     res.json(user);
// });

router.route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;