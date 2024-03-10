const mongoose = require('mongoose');
const ApiError = require('../error/ApiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getPublisher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const book = await service.ProductService.getById(id)
        const result = await service.PublisherService.getById(book.publisher)
        res.status(200).json({
            message: "Get publisher successfully",
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const result = await service.ProductService.getAll();
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
        const result = await service.ProductService.getById(id);
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
        const { email, password } = req.body;
        if (await service.ProductService.getByEmail(email))
            throw new ApiError(400, 'The book\'s email already exists.');
        const data = req.body;
        data.password = data.password = await util.hashPasswordUtil.hashPassword({ password });
        const result = await service.ProductService.create(data);
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
        const result = await service.ProductService.delete(id);
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
        if (data.password)
            data.password = await util.hashPasswordUtil.hashPassword({ password: data.password })
        const result = await service.ProductService.update({id: id, data});
        res.status(200).json({
            message: "Update book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};