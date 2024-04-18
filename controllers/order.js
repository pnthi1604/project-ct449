const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getAll = async (req, res, next) => {
    try {
        const result = await service.Order.getAll();
        res.status(200).json({
            message: "Get all order successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!util.isObjectId(id)) {
            throw new ApiError(400, "Order id is not valid");
        }
        const result = await service.Order.getById(id);
        if (!result)
            throw new ApiError(400, "Order not exist");
        res.status(200).json({
            message: "Get order successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const result = service.Order.create(data)
        res.status(201).json({
            message: "Create order successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Order id is not valid");
        }
        const result = await service.Order.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete order successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Order id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Order id is not valid");
        }
        const data = req.body;
        if (data.password)
            data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const result = await service.Order.update({id: id, data});
        res.status(200).json({
            message: "Update order successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};