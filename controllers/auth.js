const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

const adminRole = process.env.ADMIN_ROLE
const userRole = process.env.USER_ROLE

exports.register = async (req, res, next) => {
    try {
        const data = req.body;
        if (await service.User.getByEmail(data.email) || await service.Employee.getByEmail(data.email))
            throw new ApiError(400, 'The user\'s email already exists.');
        data.password = await util.hashPassword.hashPassword({ password: data.password })
        const user = await service.User.create(data);
        util.jwt.createJWT(
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
        const user = await service.User.getByEmail(email);
        const employee = await service.Employee.getByEmail(email)
        const correctPassword = await util.hashPassword.comparePassword({
            password,
            hashPassword: user ? user.password : employee.password,
        })
        if (!correctPassword)
            throw new ApiError(400, "Password is wrong");
        util.jwt.createJWT(
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
        util.jwt.resetJWT({ response: res })
        res.status(200).json({
            message: "Log out successfully",
        });
    } catch (err) {
        next(err);
    }
};