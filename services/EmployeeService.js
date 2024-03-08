const EmployeeModel = require('../models/EmployeeModel.js');

exports.create = async (employee) => {
    const result = await EmployeeModel.create(employee);
    return result;
};

exports.getAll = async () => {
    const result = await EmployeeModel.find({});
    return result;
};

exports.getById = async (id) => {
    const result = await EmployeeModel.findOne({ _id: id });
    return result;
};

exports.getByEmail = async (email) => {
    const result = await EmployeeModel.findOne({ email });
    return result;
};

exports.delete = async (id) => {
    const result = await EmployeeModel.deleteOne({ _id: id });
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