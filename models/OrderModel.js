const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id is required"],
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Product id is required"]
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        }
    }],
    status: {
        type: String,
        enum: ["Đang xử lý", "Đang giao hàng", "Đã hoàn thành", "Đã hủy"],
        default: "Đang xử lý",
    }
});

OrderSchema.path('status').validate(function(value) {
    if (!this.employeeId) {
        return value !== "Đang giao hàng" && value !== "Đã hoàn thành";
    }
    return true;
}, "Invalid status based on employee id");

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;