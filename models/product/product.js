const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [50, "Name must be at most 50 characters"],
        required: [true, "Name is required"],
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: [true, "Image is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    publishYear: {
        type: Number,
        required: [true, "Publishing Year is required"],
    },
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: [true, "Publisher id is required"],
    },
    author: {
        type: String,
        minlength: [8, "Author must be at least 8 characters"],
        maxlength: [50, "Author must be at most 50 characters"],
        required: [true, "Author is required"],
    },
    description: {
        type: String,
        default: "Chưa có mô tả",
    },
    borrowingTime: {
        type: Number,
        default: 10,
    },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;