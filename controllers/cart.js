const ApiError = require('../error/apiError.js');
const service = require("../services/index.js")
const util = require("../utils/index.js")

exports.extractCart = async (cart) => {
    const product = await service.Product.getById(cart._doc.productId._doc._id)
    cart._doc.productId._doc = product
    const imageUrl = util.handleImg.renderImageUrl(cart._doc.productId._doc.imageId._doc.contentType, cart._doc.productId._doc.imageId._doc.data);
    cart._doc.productId._doc.imageId._doc.imageUrl = imageUrl;
    cart._doc.quantity = Math.min(cart._doc.quantity, cart._doc.productId._doc.quantity)

    // if quantity == 0 => delete cart
    if (cart._doc.quantity === 0) {
        await service.Cart.delete({
            userId: cart._doc.userId._doc._id,
            productId: cart._doc.productId._doc._id
        })
        return null
    }
    return cart
}

exports.getAll = async (req, res, next) => {
    const { userId } = req.params
    try {
        if (!(util.isObjectId(userId))) {
            throw new ApiError(400, "User id is not valid");
        }
        let carts = await service.Cart.getAll(userId)
        
        carts = await Promise.all(carts.map(async (cart) => {
            return this.extractCart(cart)
        }));

        // filter cart is null
        carts = carts.filter(cart => cart !== null)

        res.status(200).json({
            message: "Get all cart successfully",
            data: carts,
        });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    const { id } = req.params
    try {
        if (!(util.isObjectId(id))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const cart = await service.Cart.getById({
            cartId: id
        })
        if (!cart)
            throw new ApiError(400, "Cart not exist");
        const result = await this.extractCart(cart)
        if (result)
            res.status(200).json({
                message: "Get cart successfully",
                data: result,
            });
        else {
            throw new ApiError(400, "Cart not exist");
        }
    } catch (err) {
        next(err);
    }
};

exports.add = async (req, res, next) => {
    const { userId, productId } = req.params
    
    // check userId, productId
    if (!(util.isObjectId(userId) || !util.isObjectId(productId)))
        throw new ApiError(400, "User id or Product id is not valid");

    // call api product to get quantity
    const product = await service.Product.getById(productId)
    if (!product)
        throw new ApiError(400, "Product not exist")

    // get cart, if cart not exist => create cart with quantiy = 0
    let cart = await service.Cart.getById({ userId, productId })
    if (!cart)
        cart = await service.Cart.create({ userId, productId, quantity: 0 })
    
    const quantity = Math.min(req.body.quantity + cart.quantity, product.quantity)

    try {
        const result = await service.Cart.update(userId, productId, { quantity });
        res.status(200).json({
            message: "Add cart successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    const { userId, productId } = req.params

    // check userId, productId
    if (!(util.isObjectId(userId) || !util.isObjectId(productId)))
        throw new ApiError(400, "User id or Product id is not valid");

    // call api product to get quantity
    const product = await service.Product.getById(productId)
    if (!product)
        throw new ApiError(400, "Product not exist")

    // get cart, if cart not exist => create cart with quantiy = 0
    let cart = await service.Cart.getById({ userId, productId })
    if (!cart)
        cart = await service.Cart.create({ userId, productId, quantity: 0 })

    const quantity = Math.min(req.body.quantity, product.quantity)
    // quantity == 0 => delete cart
    if (quantity === 0) {
        try {
            const result = await service.Cart.delete({ userId, productId });
            if (result.deletedCount)
                res.status(200).json({
                    message: "Delete cart successfully",
                    data: result,
                });
            else
                res.status(400).json({
                    message: "Cart not exist",
                    data: result,
                });
        } catch (err) {
            next(err);
        }
    } else {
        try {
            const result = await service.Cart.update(userId, productId, { quantity });
            res.status(200).json({
                message: "Update cart successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
};

exports.delete = async (req, res, next) => {
    const { userId, productId } = req.params

    // check userId, productId
    if (!(util.isObjectId(userId) || !util.isObjectId(productId)))
        throw new ApiError(400, "User id or Product id is not valid");

    try {
        const result = await service.Cart.delete({ userId, productId });
        if (result)
            res.status(200).json({
                message: "Delete cart successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Cart not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};