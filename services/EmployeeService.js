const model = require("../models/index.js")

exports.create = async (employee) => {
    const result = await model.EmployeeModel.create(employee);
    return result;
};

exports.getAll = async () => {
    const result = await model.EmployeeModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await model.EmployeeModel.findOne({ _id: id });
    return result;
};

exports.getByEmail = async (email) => {
    const result = await model.EmployeeModel.findOne({ email });
    return result;
};


exports.delete = async (id) => {
    const result = await model.EmployeeModel.deleteOne({ _id: id });
    return result;
}

exports.update = async ({id, data}) => {
    const isExist = await this.getById(id);
    let result = null;
    if (!isExist)
        result = await this.create(data);
    else
        result = await model.EmployeeModel.findOneAndUpdate({ _id: id }, data);
    return result;
};