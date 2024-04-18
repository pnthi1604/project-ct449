const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.getAll = async (req, res, next) => {
    try {
        const { userId } = req.params
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
    let have_create_cart = false

    const data = req.body
    data.userId = req.params.userId
    data.productId = req.params.productId
    const cartId = {
        userId: data.userId,
        productId: data.productId,
        duration: data.duration,
    }

    try {
        if (!(util.isObjectId(data.userId)) || !(util.isObjectId(data.productId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        //get cart and info product
        let cart = await service.Cart.getById(cartId)
        const product = await service.Product.getById(data.productId)
        console.log({cart})
        if (!product)
            throw new ApiError(400, "Product is not exist")
        if (!cart)
            cart = await service.Cart.create(cartId)
            have_create_cart = true

        //process add quantity value
        if (!data.quantity)
            data.quantity = 1
        data.quantity = Math.min(data.quantity + cart.quantity, product.quantity)
        let result = null
        if (data.quantity <= 0)
            result = await service.Cart.delete(cartId)
        else 
            result = await service.Cart.update({cartId, data})

        res.status(200).json({
            message: "Add cart successfully",
            data: result,
        });
    } catch (err) {
        //rollback
        if (have_create_cart) 
            await service.Cart.delete(cartId)

        next(err)
    }
}

exports.update = async (req, res, next) => {
    const data = req.body
    data.userId = req.params.userId
    data.productId = req.params.productId

    try {
        if (!(util.isObjectId(data.userId)) || !(util.isObjectId(data.productId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const product = await service.Product.getById(data.productId)
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
    const { cartId } = req.params

    try {
        if (!(util.isObjectId(cartId))) {
            throw new ApiError(400, "Cart id is not valid");
        }
        const result = await service.Cart.delete(cartId);
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

// exports.deleteAll = async (req, res, next) => {
//     const { userId } = req.params

//     try {
//         if (!(util.isObjectId(userId))) {
//             throw new ApiError(400, "User id is not valid");
//         }
//         const all_cart = await service.Cart.getAll(userId)
//         if (!all_cart[0])
//             throw new ApiError(400, "Cart is empty")
        
//         const result = await service.Cart.deleteAll(userId)
//         if (result.deletedCount)
//             res.status(200).json({
//                 message: "Delete all cart successfully",
//                 data: result,
//             });
//     } catch (err) {
//         next(err);
//     }
// };