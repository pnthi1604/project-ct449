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
            enum: ["Đang xử lý", "Đang giao hàng", "Đã nhận hàng", "Đã hủy"],
            default: "Đang xử lý",
        },
        createDate: {
            type: Date,
            default: Date.now
        }
    }]
});

OrderSchema.methods.sortOrderStatusByCreateDate = function() {
    this.orderStatus.sort((a, b) => a.createDate - b.createDate);
};

OrderSchema.pre('findById', function(next) {
    this.sortOrderStatusByCreateDate();
    next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
