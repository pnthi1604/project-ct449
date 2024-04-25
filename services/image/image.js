const model = require("../../models/index.js")

exports.create = async (data) => {
    const result = await model.Image.create(data);
    return result;
};

exports.getById = async (id) => {
    const result = await model.Image.findOne({ _id: id });
    return result;
};

exports.delete = async (id) => {
    const result = await model.Image.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.Image.findOneAndUpdate({ _id: id }, data);
    return result;
};