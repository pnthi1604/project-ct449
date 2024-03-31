const ApiError = require('../error/apiError.js');
const mongoose = require('mongoose');

const handleError = (err) => {
    if(err instanceof ApiError) 
        return err;
    else if(err instanceof mongoose.Error)
        return new ApiError(400, err.errors[Object.keys(err.errors)[0]].message);
    return new ApiError(500, err.message);
};

module.exports = handleError;