const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

// create new user  -> /api/v1/user/new h
exports.newUser = async (req, res, next) => {
    const user = await User.create(req.body);

    sendToken(user, 200, res);
};

// Get Single user -> /api/v1/user/:id
exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            succes: false,
            message: "user not found by id",
        });
    }

    res.status(200).json({
        succes: true,
        user,
    });
};

// Get all users -> /api/v1/users
exports.allUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        succes: true,
        users,
    });
};

// Update user by id -> /api/v1/user/update/:id
exports.updateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id, req.body);

    if (!user) {
        return res.status(404).json({
            succes: true,
            messge: "user not found by id",
        });
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        succes: true,
        user,
    });
};

// Delete user by id -> /api/v1/user/delete/:id
exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404).json({
            succes: false,
            message: "User not found by id",
        });
    }

    res.status(200).json({
        succes: true,
        user,
    });
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        res.status(200).json({
            message: "Please enter email and password",
        });
    }

    // Finding user in database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid Email or password",
        });
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(404).json({
            success: false,
            message: "Invalid Email or password",
        });
    }
    sendToken(user, 200, res);
};
