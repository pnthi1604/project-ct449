const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        minlength: [8, "Last name must be at least 8 characters"],
        maxlength: [20, "Last name must be at most 50 characters"],
        required: [true, "Last name is required"],
    },
    firstName: {
        type: String,
        minlength: [8, "First name must be at least 8 characters"],
        maxlength: [20, "First name must be at most 50 characters"],
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
        minlength: [8, "Address must be at least 8 characters"],
        maxlength: [50, "Address must be at most 50 characters"],
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        match: [/^[0-9]{8,15}$/, "Phone must be at least 8 characters and at most 15 characters and all characters must be numbers"],
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [50, "Password must be at most 50 characters"],
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        unique: [true, "Email is already taken"],
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