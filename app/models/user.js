const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [20, "Name can't exceed 220 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please enter correct email address"],
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Please enter your phone number"],
    },
    gender: {
        type: String,
        trim: true,
        maxLength: [7, "Gender can not exceed 7 characters"],
    },
    password: {
        type: String,
        select: false,
        required: [true, "Enter your password"],
        minLenght: [6, "Your password must be longer than 6 characters"],
    },
    avatar: {},
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encryption password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};
module.exports = mongoose.model("user", userSchema);
