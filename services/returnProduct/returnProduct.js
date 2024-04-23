const model = require("../../models/index.js");

exports.getAll = async () => {
    const results = await model.ReturnProduct.find({}).populate("productId");
    return results;
}

exports.create = async (returnProduct) => {
    const result = await model.ReturnProduct.create(returnProduct);
    return result;
}

exports.getById = async (returnProductId) => {
    const result = await model.ReturnProduct.findOne({ _id: returnProductId }).populate("productId");
    return result;
}

exports.getByUserId = async (userId) => {
    console.log({
        userId_in_returnProduct: userId
    })
    const results = await model.ReturnProduct.find({ userId }).populate("productId");
    return results;
}

exports.update = async (returnProductId, data) => {
    const result = await model.ReturnProduct.findOneAndUpdate({ _id: returnProductId }, data, { new: true });
    return result;
}