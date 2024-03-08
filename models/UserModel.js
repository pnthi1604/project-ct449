const mongoose = require('mongoose');
const testEmail = require('email-validator');

const UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    dataOfBirth: {
        type: Date,
        required: true,
    },
    male: {
        type: Boolean,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

// UserSchema.path('email').validate(async function (value) {
//     return testEmail.validate(value);
// }, 'Email is not valid.');

const User = mongoose.model("User", UserSchema);
module.exports = User;