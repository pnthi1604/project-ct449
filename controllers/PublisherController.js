const mongoose = require('mongoose');
const ApiError = require('../error/ApiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getAll = async (req, res, next) => {
    try {
        const result = await service.PublisherService.getAll();
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
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const result = await service.PublisherService.getById(id);
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
        const { email, password } = req.body;
        if (await service.PublisherService.getByEmail(email))
            throw new ApiError(400, 'The publisher\'s email already exists.');
        const data = req.body;
        data.password = data.password = await util.hashPasswordUtil.hashPassword({ password });
        const result = await service.PublisherService.create(data);
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
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const result = await service.PublisherService.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete publisher successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Publisher id not exist",
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
            throw new ApiError(400, "Publisher id is not valid");
        }
        const data = req.body;
        if (data.password)
            data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const result = await service.PublisherService.update({id: id, data});
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};