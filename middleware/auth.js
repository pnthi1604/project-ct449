const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError.js');

const jwtSecret = process.env.JWT_SECRET
const adminRole = "admin"
const userRole = "user"

const getRole = (token) => {
    if (!token)
        return null
    const decoded = jwt.verify(token, jwtSecret)
    return decoded.role
}

const checkRole = (role, target, next) => {
    if (!role)
        throw new ApiError(401, "Hết phiên đăng nhập, vui lòng đăng nhập hoặc đăng ký");
    if (role != target)
        throw new ApiError(401, "Tài khoản của bạn không có quyền truy cập, vui lòng đăng nhập với tài khoản có quyền truy cập");
    return next()
}

exports.adminAuth = async (req, res, next) => {
    try {
        const role = getRole(req.cookies.jwt)
        return checkRole(role, adminRole, next)
    } catch (err) {
        next(err);
    }
};

exports.userAuth = async (req, res, next) => {
    try {
        const role = getRole(req.cookies.jwt)
        return checkRole(role, userRole, next)
    } catch (err) {
        next(err);
    }
};