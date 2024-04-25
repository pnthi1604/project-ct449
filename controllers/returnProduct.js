const service = require("../services/index.js");
const ApiError = require("../error/apiError.js")
const util = require("../utils/index.js");

exports.getAll = async (req, res, next) => {
    try {
        const returnProducts = await service.ReturnProduct.getAll();
        if (!returnProducts)
            throw new ApiError(404, "Return products not found");
        return res.status(200).json({
            message: "Successfully retrieved return products",
            data: returnProducts,
        });
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const returnProduct = req.body;
        const result = await service.ReturnProduct.create(returnProduct);
        if (!result)
            throw new ApiError(400, "Failed to create return product");
        return res.status(201).json({
            message: "Successfully created return product",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!util.isObjectId(id))
            throw new ApiError(400, "Invalid id");
        const result = await service.ReturnProduct.getById(id);
        if (!result) {
            throw ApiError.notFound("Return product not found");
        }
        return res.status(200).json({
            message: "Successfully retrieved return product",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

exports.getByUserId = async (req, res,  next) => {
    try {
        const { id } = req.params;
        if (!util.isObjectId(id))
            throw new ApiError(400, "Invalid userId");
        const result = await service.ReturnProduct.getByUserId(id);
        if (!result)
            throw new ApiError(404, "Return products not found");
        return res.status(200).json({
            message: "Successfully retrieved return products",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!util.isObjectId(id))
            throw new ApiError(400, "Invalid id");
        const data = req.body;

        // handle status == "Đã trả"
        if (data.status == "Đã trả") {
            const { quantity, productId } = data;
            // update product quantity
            const product = await service.Product.getById(productId);
            if (!product)
                throw new ApiError(404, "Product not found");
            const newQuantity = product.quantity + quantity;
            const result = await service.Product.update({
                id: productId,
                data: { quantity: newQuantity }
            });
            if (!result)
                throw new ApiError(400, "Failed to update product quantity");
        }

        const result = await service.ReturnProduct.update(id, data);
        if (!result)
            throw new ApiError(400, "Failed to update return product");
        return res.status(200).json({
            message: "Successfully updated return product",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}