const mongoose = require('mongoose');

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
    activeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
})

OrderStatusSchema.path('title').validate(async function (title) {
    if (title == "Đang giao hàng")
        return this.activeBy != null
    return true
}, 'Employee id is required')

const OrderStatus = mongoose.model("OrderStatus", OrderStatusSchema)
module.exports = OrderStatus