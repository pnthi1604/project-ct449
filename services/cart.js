const model = require("../models/index.js")

exports.create = async (cart) => {
    const result = await model.Cart.create(cart);
    return result;
};

exports.getById = async (cartId) => {
    const result = await model.Cart.findOne(cartId)
    return result
}

exports.getAll = async (userId) => {
    const result = await model.Cart.find({ userId });
    return result;
};

exports.update = async (data) => {
    const { userId, productId} = data
    const result = await model.Cart.findOneAndUpdate({ userId, productId }, data)
    return result
}

exports.delete = async (cartId) => {
    const result = await model.Cart.deleteOne(cartId);
    return result;
}