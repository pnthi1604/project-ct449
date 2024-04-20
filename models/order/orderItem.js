const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
    borrowingTime: {
        type: Number,
        required: [true, "Borrowing time is required"],
    },
})

const OrderItem = mongoose.model("OrderItem", OrderItemSchema)
module.exports = OrderItem