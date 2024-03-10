const model = require("../models/index.js")

exports.create = async (user) => {
    const result = await model.PublisherModel.create(user);
    return result;
};

exports.getAll = async () => {
    const result = await model.PublisherModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.PublisherModel.findOne({ _id: id });
    return result;
};

exports.delete = async (id) => {
    const result = await model.PublisherModel.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.PublisherModel.findOneAndUpdate({ _id: id }, data);
    return result;
};