const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getAll = async (req, res, next) => {
    try {
        const result = await service.Publisher.getAll();
        res.status(200).json({
            message: "Get all publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await service.Publisher.getById(id);
        if (!result)
            throw new ApiError(400, "Publisher not exist");
        res.status(200).json({
            message: "Get publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await service.Publisher.create(data);
        res.status(201).json({
            message: "Create publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(util.isObjectId(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const result = await service.Publisher.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete publisher successfully",
                data: result,
            });
        else
            throw new ApiError(400, "Publisher id not exist")
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(util.isObjectId(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const data = req.body;
        if (data.password)
            data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const result = await service.Publisher.update({id: id, data});
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};