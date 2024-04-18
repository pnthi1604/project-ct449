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
    duration: {
        type: Number,
        required: [true, "Duration (Days) is required"]
    },
    status: {
        type: String,
        default: "Đang mượn",
        enum: ["Đang mượn", "Đã trả", "Quá hạn"],
    },
})

const OrderItem = mongoose.model("OrderItem", OrderItemSchema)
module.exports = OrderItem