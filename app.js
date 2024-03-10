const express = require('express');
require('dotenv').config();
const cors = require('cors');
const ApiError = require('./error/ApiError.js');
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

app.use('/', router.AuthRouter);
app.use('/user', router.UserRouter);
app.use('/employee', router.EmployeeRouter);
app.use('/product', router.ProductRouter);
app.use('/cart', router.CartRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    const { statusCode, message } = middleware.handleErrorMiddleware(err);
    return res.status(statusCode).json({
        message
    });
});

module.exports = app;