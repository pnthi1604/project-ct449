const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    publishingYear: {
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
        required: [true, "Author is required"],
    },
    describe: {
        type: String,
        default: "Chưa có mô tả",
    },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;