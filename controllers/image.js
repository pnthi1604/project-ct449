const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")
const fs = require('fs');

exports.create = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ApiError(400, "Image is required");
        }
        const data = {
            data: fs.readFileSync(file.path),
            contentType: file.mimetype,
        }
        const result = await service.Image.create(data);
        res.status(200).json({
            message: "Image created successfully",
            data: result,
        });
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await service.Image.getById(id);
        if (!result) {
            throw new ApiError(400, "Image not found");
        }
        const imageUrl = util.handleImg.renderImageUrl(result.contentType, result.data);
        res.status(200).json({
            message: "Image found",
            data: {
                ...result,
                imageUrl,
            }
        });
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await service.Image.delete(id);
        res.status(200).json({
            message: "Image deleted successfully",
            data: result,
        });
    } catch (err) {
        next(err)
    }
}