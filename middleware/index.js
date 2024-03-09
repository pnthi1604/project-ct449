const authMiddleware = require('./auth.js')
const handleErrorMiddleware = require('./handleError.js')

module.exports = {
    authMiddleware,
    handleErrorMiddleware,
}