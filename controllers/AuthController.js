const { 
    UserService,
    EmployeeService,
} = require('../services/index.js');
const ApiError = require('../error/api-error.js');
const bcrypt = require('bcrypt');
const {
    jwtUtil,
    hashPasswordUtil,
} = require('../utils/index.js')

exports.register = async (req, res, next) => {
    try {
        const data = req.body;
        if (await UserService.getByEmail(data.email) || await EmployeeService.getByEmail(data.email))
            throw new ApiError(400, 'The user\'s email already exists.');
        data.password = await hashPasswordUtil.hashPassword({ password: data.password })
        const user = await UserService.create(data);
        jwtUtil.createJWT(
            {
                response: res,
                id: user.id, 
                email: user.email, 
                role: "basic",
            }
        )
        res.status(200).json({
            message: "Register successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.getByEmail(email);
        const employee = await EmployeeService.getByEmail(email)
        const correctPassword = await hashPasswordUtil.comparePassword({
            password,
            hashPassword: user ? user.password : employee.password
        })
        if (!correctPassword)
            throw new ApiError(400, "Password is wrong");
        jwtUtil.createJWT(
            {
                response: res,
                id: user ? user.id : employee.id, 
                email: user ? user.email : employee.email, 
                role: user ? "basic" : "admin",
            }
        )

        res.status(200).json({
            message: "Login successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        jwtUtil.resetJWT({ response: res })
        res.status(200).json({
            message: "Logout successfully",
        });
    } catch (err) {
        next(err);
    }
};