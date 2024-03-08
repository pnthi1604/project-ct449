const express = require('express');
const cors = require('cors');
const ApiError = require('./error/api-error.js');
const handleError = require('./middleware/handle-error.js');
require('dotenv').config();
const {
    UserRouter,
    EmployeeRouter,
    AuthRouter,
} = require('./routes/index.js');
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

app.use("/", AuthRouter);
app.use('/user', UserRouter);
app.use('/employee', EmployeeRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    err = handleError(err);
    return res.status(err.statusCode).json({
        message: err.message,
    });
});

module.exports = app;