const model = require("../models/index.js")

exports.create = async (cart) => {
    const result = await model.CartModel.create(cart);
    return result;
};

exports.getById = async (cartId) => {
    const result = await model.CartModel.findOne(cartId)
    return result
}

exports.getAll = async (userId) => {
    const result = await model.CartModel.find({ userId });
    return result;
};

exports.update = async (data) => {
    const { userId, productId} = data
    const result = await model.CartModel.findOneAndUpdate({ userId, productId }, data)
    return result
}

exports.delete = async (cartId) => {
    const result = await model.CartModelModel.deleteOne(cartId);
    return result;
}