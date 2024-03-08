const UserModel = require('../models/UserModel.js');

exports.create = async (user) => {
    const result = await UserModel.create(user);
    return result;
};

exports.getAll = async () => {
    const result = await UserModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await UserModel.findOne({ _id: id });
    return result;
};

exports.getByEmail = async (email) => {
    const result = await UserModel.findOne({ email });
    return result;
};

exports.delete = async (id) => {
    const result = await UserModel.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await UserModel.findOneAndUpdate({ _id: id }, data);
    return result;
};