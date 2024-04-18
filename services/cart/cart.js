const model = require("../../models/index")

exports.create = async (cart) => {
    const result = await model.Cart.create(cart);
    return result;
}

exports.getById = async (cartId) => {
    const result = await model.Cart.findOne(cartId)
    return result
}

exports.getAll = async (userId) => {
    const result = await model.Cart.find({ userId });
    return result;
};

exports.update = async ({cartId, data}) => {
    const result = await model.Cart.findOneAndUpdate(cartId, data)
    return result
}

exports.delete = async (cartId) => {
    const result = await model.Cart.deleteOne({_id: cartId});
    return result;
}

exports.deleteAll = async (userId) => {
    const result = await model.Cart.deleteMany({ userId });
    return result;
}