const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const maxAge = 3 * 60 * 60
// const maxAge = 5

const createToken = (data) => {
    return jwt.sign(data, jwtSecret, {
        expiresIn: maxAge,
    })
}

const createJWT = ({ response, data }) => {
    const token = createToken(data)
    response.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
    });
    return token
}

const resetJWT = ({ response }) => {
    response.cookie("jwt", "", {
        maxAge: 1,
    });
}

module.exports = {
    createJWT,
    resetJWT,
}