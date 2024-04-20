const model = require("../../models/index.js")

exports.create = async (orderItem) => {
    // productId, quantity, price, borrowDate, returnDate
    console.log("vao ham")
    const result = await model.OrderItem.create(orderItem);
    console.log({
        "order item": result,
    })
    return result
}

exports.getById = async (id) => {
    const result = await model.OrderItem.findOne({ _id: id }).populate("productId")
    return result
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.OrderItem.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
}

exports.getAll = async () => {
    const result = await model.OrderItem.find({});
    return result
}

exports.delete = async (id) => {
    const result = await model.OrderItem.deleteOne({ _id: id });
    return result
}
