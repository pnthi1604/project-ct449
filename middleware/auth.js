const jwt = require('jsonwebtoken');
const ApiError = require('../error/api-error.js');

const jwtSecret = process.env.JWT_SECRET

exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token)
            throw new ApiError(401, "Not authorized, please log in or register");
        const decoded = jwt.verify(token, jwtSecret);
        if(decoded.role == "admin") 
            return next();
        throw new ApiError(401, "Not authorized");
    } catch (err) {
        next(err);
    }
};

exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token)
            throw new ApiError(401, "Not authorized, please log in or register");
        const decoded = jwt.verify(token, jwtSecret);
        if(decoded.role == "basic")
            next();
        throw new ApiError(401, "Not authorized");
    } catch(err) {
        next(err);
    }
};