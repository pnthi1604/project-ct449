const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getAll = async (req, res, next) => {
    try {
        const { userId } = req.body
        const result = await service.Cart.getAll(userId);
        res.status(200).json({
            message: "Get all cart successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.add = async (req, res, next) => {
    try {
        const data = req.body
        if (!(util.isObjectId(data.userId)) || !(util.isObjectId(data.productId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const cartId = {
            userId: data.userId,
            productId: data.productId,
        }
        const cart = await service.Cart.getById(cartId)
        const product = await service.ProductService.getById(data.productId)
        if (!data.quantity)
            data.quantity = 1
        data.quantity = Math.min(data.quantity + cart.quantity, product.quantity)
        let result = null
        if (!cart)
            result = await service.Cart.create(data)
        else {
            result = await service.Cart.update(data);
        }
        res.status(200).json({
            message: "Update cart successfully",
            data: result,
        });
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = req.body;
        if (!(util.isObjectId(data.userId)) || !(util.isObjectId(data.productId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const product = await service.ProductService.getById(data.productId)
        if (!data.quantity)
            data.quantity = 1
        data.quantity = Math.min(product.quantity, data.quantity)
        const result = await service.Cart.update(data);
        res.status(200).json({
            message: "Update cart successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const data = req.body
        if (!(util.isObjectId(data.userId)) || !(util.isObjectId(data.productId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const result = await service.Cart.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete cart successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Cart id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};