// create and send token
// and Save in the cookie
const sendToken = (user, statusCode, res) => {
    // Create token first
    const token = user.getJwtToken();

    // Cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPRIES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;
