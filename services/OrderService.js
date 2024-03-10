const model = require("../models/index.js")

exports.create = async (user) => {
    const result = await model.UserModel.create(user);
    return result;
};

exports.getAll = async () => {
    const result = await model.UserModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.UserModel.findOne({ _id: id });
    return result;
};

exports.getByEmail = async (email) => {
    const result = await model.UserModel.findOne({ email });
    return result;
};

exports.delete = async (id) => {
    const result = await model.UserModel.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.UserModel.findOneAndUpdate({ _id: id }, data);
    return result;
};