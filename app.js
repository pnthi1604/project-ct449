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

app.use('/api', router.Auth);
app.use('/api/users', router.User);
app.use('/api/employees', router.Employee);
app.use('/api/publishers', router.Publisher)
app.use('/api/products', router.Product);
app.use("/api/images", router.Image)
app.use('/api/carts', router.Cart)
app.use('/api/orders', router.Order)
app.use('/api/return-products', router.ReturnProduct)

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