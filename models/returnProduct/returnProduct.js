const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const returnProductSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: ['Đã trả', 'Đang mượn', 'Trễ hạn'],
        default: 'Đang mượn'
    },
    returnDate: {
        type: Date,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    }
});

const ReturnProduct = mongoose.model('ReturnProduct', returnProductSchema);

module.exports = ReturnProduct;