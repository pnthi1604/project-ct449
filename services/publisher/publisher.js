const model = require("../../models/index.js")

exports.create = async (user) => {
    const result = await model.Publisher.create(user);
    return result;
};

exports.getAll = async () => {
    const result = await model.Publisher.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.Publisher.findOne({ _id: id });
    return result;
};

exports.getByEmail = async (email) => {
    const result = await model.Publisher.findOne({ email: email });
    return result;
}

exports.delete = async (id) => {
    const result = await model.Publisher.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.Publisher.findOneAndUpdate({ _id: id }, data);
    return result;
};