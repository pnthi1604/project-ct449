const model = require("../../models/index")

exports.create = async (cart) => {
    const result = await model.Cart.create(cart);
    return result;
}

exports.getById = async ({cartId, userId, productId}) => {
    let result = null;
    if (cartId) 
        result = await model.Cart.findOne(cartId).populate("productId userId");
    else if (userId && productId)
        result = await model.Cart.findOne({ userId, productId }).populate("productId userId");
    return result
}

exports.getAll = async (userId) => {
    const result = await model.Cart.find({ userId }).populate("productId userId");
    return result;
};

exports.update = async (userId, productId, data) => {
    const result = await model.Cart.findOneAndUpdate({
        userId,
        productId
    }, data, { new: true });
    return result
}

exports.delete = async (userId, productId) => {
    const result = await model.Cart.deleteOne({
        userId,
        productId
    
    });
    return result;
}

exports.deleteAll = async (userId) => {
    const result = await model.Cart.deleteMany({ userId });
    return result;
}