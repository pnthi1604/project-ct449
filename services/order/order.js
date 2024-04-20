const model = require("../../models/index.js")

exports.create = async (order) => {
    // userId, orderItems, orderStatus
    const result = await model.Order.create(order);
    return result
}

exports.getById = async (id) => {
    const result = await model.Order.findOne({ _id: id });
    return result
}

exports.getAllByUserId = async (userId) => {
    const result = await model.Order.find({ userId });
    return result
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.Order.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
}

exports.getAll = async () => {
    const result = await model.Order.find({});
    return result
}

exports.delete = async (id) => {
    const result = await model.Order.deleteOne({ _id: id });
    return result
}