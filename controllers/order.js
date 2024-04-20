const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.create = async (req, res, next) => {
    const currentDate = new Date();
    const { userId, productId, quantity, price, borrowingTime } = req.body;
    try {
        // check userId and productId
        if (!util.isObjectId(userId) || !util.isObjectId(productId))
            throw new ApiError(400, "Invalid userId or productId");

        // check userId exist
        const user = await service.User.getById(userId);
        if (!user)
            throw new ApiError(404, "User not found");

        // check productId exist
        const product = await service.Product.getById(productId);
        if (!product)
            throw new ApiError(404, "Product not found");

        // create orderItem
        const orderItem = await service.OrderItem.create({ productId, quantity, price, borrowingTime });
        if (!orderItem)
            throw new ApiError(500, "Create orderItem failed");

        // create order
        const order = await service.Order.create({
            userId,
            OrderItemsId: [
                orderItem._id
            ],
            orderStatuses: [{
                title: "Đang xử lý",
                createDate: currentDate
            }]
        })

        if (!order)
            throw new ApiError(500, "Create order failed");
        
        res.status(200).json({
            message: "Create order successfully",
            data: order,
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllByUserId = async (req, res, next) => {
    try {
        const { userId } = req.body

        // check user
        if (!util.isObjectId(userId))
            throw new ApiError(400, "Invalid userId");

        const user = await service.User.getById(userId);
        if (!user)
            throw new ApiError(404, "User not found");

        const orders = await service.Order.getAllByUserId(userId);
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        res.status(200).json({
            message: "Get orders successfully",
            data: orders,
        })
    } catch(error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const orders = await service.Order.getAll();
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        res.status(200).json({
            message: "Get orders successfully",
            data: orders,
        })
    } catch(error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        // check id
        if (!util.isObjectId(id))
            throw new ApiError(400, "Invalid id");

        // get order
        const order = await service.Order.getById(id);
        if (!order)
            throw new ApiError(404, "Order not found");

        // update order
        order.orderStatuses.push({
            title: orderStatus,
            createDate: new Date()
        });

        const results = await service.Order.update({
            _id: id,
            data: order
        });

        if (!results)
            throw new ApiError(500, "Update order failed");

        res.status(200).json({
            message: "Update order successfully",
            data: results,
        })
    } catch(error) {
        next(error)
    }
}