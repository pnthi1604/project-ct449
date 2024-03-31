const express = require('express');
require('dotenv').config();
const cors = require('cors');
const ApiError = require('./error/apiError.js');
const middleware = require('./middleware/index.js')
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome.",
    });
});

app.use('/', router.Auth);
app.use('/user', router.User);
app.use('/employee', router.Employee);
app.use('/publisher', router.Publisher)
app.use('/product', router.Product);
app.use('/cart', router.Cart)
app.use('/order', router.Order)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    const { statusCode, message } = middleware.handleError(err);
    return res.status(statusCode).json({
        message
    });
});

module.exports = app;