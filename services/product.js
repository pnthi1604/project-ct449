const ApiError = require("../error/apiError.js");
const model = require("../models/index.js")

exports.getPublisher = async (id) => {
    const product = await model.Product.findById(id).populate("publisherId").select("publisherId")
    return product.publisherId
}

exports.create = async (book) => {
    const result = await model.Product.create(book);
    return result;
};

exports.getAll = async () => {
    const result = await model.Product.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.Product.findOne({ _id: id });
    return result;
};

exports.delete = async (id) => {
    const result = await model.Product.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        throw new ApiError(400, "Product is not exits")
    else
        result = await model.Product.findOneAndUpdate({ _id: id }, data);
    return result;
};