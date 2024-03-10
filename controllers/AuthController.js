const ApiError = require('../error/ApiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

const adminRole = process.env.ADMIN_ROLE
const userRole = process.env.USER_ROLE

exports.register = async (req, res, next) => {
    try {
        const data = req.body;
        if (await service.UserService.getByEmail(data.email) || await service.EmployeeService.getByEmail(data.email))
            throw new ApiError(400, 'The user\'s email already exists.');
        data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const user = await service.UserService.create(data);
        util.jwtUtil.createJWT(
            {
                response: res,
                data: {
                    id: user.id, 
                    email: user.email, 
                    role: userRole,
                },
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
        const user = await service.UserService.getByEmail(email);
        const employee = await service.EmployeeService.getByEmail(email)
        const correctPassword = await util.hashPasswordUtil.comparePassword({
            password,
            hashPassword: user ? user.password : employee.password,
        })
        if (!correctPassword)
            throw new ApiError(400, "Password is wrong");
        util.jwtUtil.createJWT(
            {
                response: res,
                data: {
                    id: user ? user.id : employee.id, 
                    email: user ? user.email : employee.email, 
                    role: user ? userRole : adminRole,
                },
            }
        )

        res.status(200).json({
            message: "Login successfully",
            data: user ? user : employee,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        util.jwtUtil.resetJWT({ response: res })
        res.status(200).json({
            message: "Logout successfully",
        });
    } catch (err) {
        next(err);
    }
};