const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    orderItemsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
    }],
    orderStatuses: [{
        title: {
            type: String,
            enum: ["Đang xử lý", "Đang giao hàng", "Đã nhận hàng", "Yêu cầu hủy", "Đã hủy"],
            default: "Đang xử lý",
        },
        createDate: {
            type: Date,
            default: new Date(),
        },
        // employeeId update orderStatus
        activeBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
    }]
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
