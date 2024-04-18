const mongoose = require('mongoose')
const validator = require('validator')

const PublisherSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [8, "Name must be at least 8 characters"],
        maxlength: [50, "Name must be at most 50 characters"],
        required: [true, "Name is required"],
    },
    address: {
        type: String,
        minlength: [8, "Address must be at least 8 characters"],
        maxlength: [50, "Address must be at most 50 characters"],
        required: [true, "Address is required"],
    },
    email: {
        type: String,
        unique: [true, "Email is already taken"],
        required: [true, "Email is required"],
    }
})

PublisherSchema.path('email').validate({
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

const Publisher = mongoose.model("Publisher", PublisherSchema);
module.exports = Publisher;