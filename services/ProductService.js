const model = require("../models/index.js")

exports.getPublisher = async (id) => {
    const book = await this.getById(id)
    console.log({book})
    console.log(book.publisher)
}

exports.create = async (book) => {
    const result = await model.ProductModel.create(book);
    return result;
};

exports.getAll = async () => {
    const result = await model.ProductModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.ProductModel.findOne({ _id: id });
    return result;
};

exports.delete = async (id) => {
    const result = await model.ProductModel.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.ProductModel.findOneAndUpdate({ _id: id }, data);
    return result;
};