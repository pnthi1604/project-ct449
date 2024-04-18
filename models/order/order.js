const mongoose = require('mongoose');

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
})

OrderSchema.pre('find', function() {
    this.populate({
        path: 'orderStatus',
        options: { sort: { createDate: -1 } }
    });
})

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order