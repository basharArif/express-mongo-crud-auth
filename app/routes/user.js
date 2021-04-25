const express = require("express");
const router = express.Router();

const {
    newUser,
    getUser,
    allUsers,
    updateUser,
    deleteUser,
    loginUser,
} = require("../controllers/userController");

router.route("/user/new").post(newUser);
router.route("/user/:id").get(getUser);
router.route("/users").get(allUsers);
router.route("/user/update/:id").put(updateUser);
router.route("/user/delete/:id").post(deleteUser);

// User login
router.route("/login").post(loginUser);

module.exports = router;
