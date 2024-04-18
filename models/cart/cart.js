const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required"],
    },
    duration: {
        type: Number,
        max: 90,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;