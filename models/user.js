const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    male: {
        type: Boolean,
        required: [true, "Gender male or female is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    }
});

UserSchema.path('email').validate({
    validator: function(value) {
        if (validator.isEmail(value))
            return true 
        return false
    },
    message: function(props) {
        if (!validator.isEmail(props.value))
            return "Email is not valid"
        return "An error has occurred"
    },
})

const User = mongoose.model("User", UserSchema);
module.exports = User;