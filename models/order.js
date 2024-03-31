const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js')

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
        required: [true, "Borrow date is required"],
    },
    returnDate: {
        type: Date,
        required: [true, "Retunrn date is required"],
    },
})

const OrderItem = mongoose.model("OrderItem", OrderItemSchema)

const OrderStatusSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Đang xử lý", "Đang giao hàng", "Đã nhận hàng", "Đã hủy"],
        default: "Đang xử lý",
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    createByEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
})

OrderStatusSchema.path('title').validate(async function (value) {
    return value != "Đang giao hàng" || this.createByEmployee != null
}, 'Employee id is required');

const OrderStatus = mongoose.model("OrderStatus", OrderStatusSchema)

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
    }],
    orderStatus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderStatus',
    }],
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;