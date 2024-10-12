export const sendToken = (user, statusCode, res, message) => {
    const token = user.geJWTToken();
    const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 5;  // Ensure COOKIE_EXPIRE is a number

    // Calculate expiration date
    const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

    
    const options = {
        expires: expirationDate,
        httpOnly: true,
        };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};
