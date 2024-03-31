const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getPublisher = async (req, res, next) => {
    try {
        const id = req.params.id;
        publisher = await service.Product.getPublisher(id)
        if (!publisher)
            throw new ApiError(400, "Can not get publisher")
        res.status(200).json({
            message: "Get publisher successfully",
            data: publisher
        })
    } catch (err) {
        next(err)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const result = await service.Product.getAll();
        res.status(200).json({
            message: "Get all book successfully",
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
            throw new ApiError(400, "Book id is not valid");
        }
        const result = await service.Product.getById(id);
        if (!result)
            throw new ApiError(400, "Book not exist");
        res.status(200).json({
            message: "Get book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await service.Product.create(data);
        res.status(201).json({
            message: "Create book successfully",
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
            throw new ApiError(400, "Book id is not valid");
        }
        const result = await service.Product.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete book successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Book id not exist",
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
            throw new ApiError(400, "Book id is not valid");
        }
        const data = req.body;
        const result = await service.Product.update({id: id, data});
        res.status(200).json({
            message: "Update book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};