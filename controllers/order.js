const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.create = async (req, res, next) => {
    let { carts } = req.body;
    // carts => cart => userId, productId, quanity
    try {
        // filter carts which have valid productId and userId
        console.log({carts})
        carts = await Promise.all(carts.filter(async (cart) => {
            if (!util.isObjectId(cart.userId) || !util.isObjectId(cart.productId))
                return false;
            const product = await service.Product.getById(cart.productId);
            const user = await service.User.getById(cart.userId);
            if (product && user)
                return true
            return false
        }));

        if (carts.length === 0)
            throw new ApiError(400, "Not valid carts");

        // get orderItemsId
        // create OderItem => productId, quantity, price, borrowingTime
        const orderItemsId = await Promise.all(carts.map(async (cart) => {
            const product = await service.Product.getById(cart.productId);
            const { price, borrowingTime } = product;
            const { quantity } = cart;
            console.log({
                "type order item": service.OrderItem.create,
            })
            console.log({
                productId: cart.productId,
                quantity,
                price,
                borrowingTime
            })
            const orderItem = await service.OrderItem.create({
                productId: cart.productId,
                quantity,
                price,
                borrowingTime
            });
            console.log({orderItem})
            if (!orderItem)
                throw new ApiError(400, "Create orderItem failed");
            return orderItem._id;
        }));


        // create initial orderStatus
        const orderStatus = {
            title: "Đang xử lý",
            createDate: new Date(),
            activeBy: null,
        }

        // create Order => userId, orderItemsId, orderStatuses
        const order = await service.Order.create({
            userId: carts[0].userId,
            orderItemsId,
            orderStatuses: [orderStatus],
        });

        if (!order)
            throw new ApiError(400, "Create order failed");

        res.status(200).json({
            message: "Create order successfully",
            data: order,
        })
    } catch (error) {
        next(error)
    }
}

exports.extractOrders = async (req, res, next) => {
    let { orders } = req.body;
    try {
        orders = await Promise.all(orders.map(async (order) => {
            order._doc.orderItemsId = await Promise.all(order._doc.orderItemsId.map(async (orderItemId) => {
                const orderItem = await service.OrderItem.getById(orderItemId); //populate productId
                return orderItem
            }))
            console.log({order})
            return order
        }))

        console.log({orders})


        res.status(200).json({
            message: req.body.message,
            data: orders,
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // check user
        if (!util.isObjectId(userId))
            throw new ApiError(400, "Invalid userId");
        const user = await service.User.getById(userId);
        if (!user)
            throw new ApiError(404, "User not found");

        const orders = await service.Order.getAllByUserId(userId);
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        req.body.orders = orders;
        req.body.message = "Get orders successfully";
        return this.extractOrders(req, res, next);
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const orders = await service.Order.getAll();
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        req.body.orders = orders;
        req.body.message = "Get orders successfully";
        return this.extractOrders(req, res, next);
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { orderId, adminId } = req.params;
        console.log({orderId, adminId})
        const { orderStatus } = req.body;

        // check id
        if (!util.isObjectId(orderId) || !util.isObjectId(adminId))
            throw new ApiError(400, "Invalid orderId or adminId");

        // get order
        const order = await service.Order.getById(orderId);
        if (!order)
            throw new ApiError(404, "Order not found");

        // update order
        order.orderStatuses.push({
            title: orderStatus.title,
            createDate: new Date(),
            activeBy: adminId,
        });

        if (orderStatus.title == "Đã nhận hàng") {
            order.orderItemsId = await Promise.all(order.orderItemsId.map(async (orderItemId) => {
                // update product
                const orderItem = await service.OrderItem.getById(orderItemId)
                const product = await service.Product.getById(orderItem.productId)
                product.quantity -= orderItem.quantity
                console.log({
                    "update product": product
                })

                const resUpdateProduct = await service.Product.update({
                    id: product._id,
                    data: product
                })

                console.log({
                    "product update response": resUpdateProduct
                })

                if (!resUpdateProduct) {
                    throw new ApiError(400, "Update product failed")
                }

                // update borrowDate and returnDate for orderItem
                const borrowDate = new Date()
                let returnDate = borrowDate
                returnDate.setDate(returnDate.getDate() + orderItem.borrowingTime)
                orderItem.borrowDate = borrowDate
                orderItem.returnDate = returnDate

                const resUpdateOrderItem = await service.OrderItem.update({
                    id: orderItemId,
                    data: orderItem,
                })

                if (!resUpdateOrderItem)
                    throw new ApiError(400, "Update order item failed")

                return orderItemId
            }))
        }

        const results = await service.Order.update({
            _id: orderId,
            data: order
        });

        if (!results)
            throw new ApiError(500, "Update order failed");

        res.status(200).json({
            message: "Update order successfully",
            data: results,
        })
    } catch (error) {
        next(error)
    }
}