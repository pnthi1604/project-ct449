const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const maxAge = process.env.MAXAGE

let createJWT = ({response, id, email, role}) => {
    const token = jwt.sign(
        {
            id,
            email,
            role,
        }, jwtSecret, { expiresIn: maxAge });
    response.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
    });
}

let resetJWT = ({ response}) => {
    response.cookie("jwt", "", { maxAge: 1 });
}

module.exports = {
    createJWT,
    resetJWT,
}