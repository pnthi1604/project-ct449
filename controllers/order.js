const mongoose = require('mongoose');
const ApiError = require('../error/apiError.js');
const util = require('../utils/index.js')
const service = require("../services/index.js")

exports.create = async (req, res, next) => {
    let { cartsId, infoPayment } = req.body;
    // carts => cart => userId, productId, quanity
    // infoPayment => address, phone, fullname
    try {
        // let carts
        let carts = await Promise.all(cartsId.map(async (cartId) => {
            const cart = await service.Cart.getById({ cartId });
            return cart
        }));

        // filter carts which have valid productId and userId
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
            const orderItem = await service.OrderItem.create({
                productId: cart.productId,
                quantity,
                price,
                borrowingTime
            });
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
            ...infoPayment,
        });

        if (!order)
            throw new ApiError(400, "Create order failed");

        // delete carts
        await Promise.all(cartsId.map(async (cartId) => {
            const result = await service.Cart.delete({ cartId });
            if (!result)
                throw new ApiError(400, "Delete cart failed");
        }));

        res.status(200).json({
            message: "Create order successfully",
            data: order,
        })
    } catch (error) {
        next(error)
    }
}

exports.extractOrder = async (order) => {
    order._doc.orderItemsId = await Promise.all(order._doc.orderItemsId.map(async (orderItemId) => {
        const orderItem = await service.OrderItem.getById(orderItemId); //populate productId
        return orderItem
    }))
    return order
}

exports.getById = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        // check id
        if (!util.isObjectId(orderId))
            throw new ApiError(400, "Invalid orderId");

        let order = await service.Order.getById(orderId);
        if (!order)
            throw new ApiError(404, "Order not found");

        order = await this.extractOrder(order);
        res.status(200).json({
            message: "Get order successfully",
            data: order,
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = id;

        // check user
        if (!util.isObjectId(userId))
            throw new ApiError(400, "Invalid userId");
        const user = await service.User.getById(userId);
        if (!user)
            throw new ApiError(404, "User not found");

        let orders = await service.Order.getAllByUserId(userId);
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        orders = await Promise.all(orders.map(async (order) => {
            return await this.extractOrder(order)
        }));

        res.status(200).json({
            message: "Get orders successfully",
            data: orders,
        })
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        let orders = await service.Order.getAll();
        if (!orders)
            throw new ApiError(500, "Get orders failed");

        orders = await Promise.all(orders.map(async (order) => {
            return await this.extractOrder(order)
        }));

        res.status(200).json({
            message: "Get orders successfully",
            data: orders,
        })
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id, adminId } = req.params;
        const { orderStatus } = req.body;
        const orderId = id;

        // check orderStatus
        const statuses = ["Đang giao hàng", "Đã nhận hàng", "Đã hủy"]
        if (statuses.includes(orderStatus.title)) {
            // check adminId
            if (!util.isObjectId(adminId))
                throw new ApiError(400, "Invalid adminId");
            // check admin exist
            const admin = await service.Employee.getById(adminId);
            if (!admin)
                throw new ApiError(404, "Admin not found");
        }

        // check id
        if (!(util.isObjectId(orderId)))
            throw new ApiError(400, "Invalid orderId");

        // get order
        const order = await service.Order.getById(orderId);
        if (!order)
            throw new ApiError(404, "Order not found");

        // update order
        order.orderStatuses.push({
            ...orderStatus,
            createDate: new Date(),
            activeBy: adminId ? adminId : null,
        });

        // update orderItemsId with status == "Đang giao hàng"
        if (orderStatus.title == "Đang giao hàng") {
            order.orderItemsId = await Promise.all(order.orderItemsId.map(async (orderItemId) => {
                // update product
                const orderItem = await service.OrderItem.getById(orderItemId)
                const product = await service.Product.getById(orderItem.productId)
                product.quantity -= orderItem.quantity

                const resUpdateProduct = await service.Product.update({
                    id: product._id,
                    data: product
                })

                if (!resUpdateProduct) {
                    throw new ApiError(400, "Update product failed")
                }

                const resUpdateOrderItem = await service.OrderItem.update({
                    id: orderItemId,
                    data: orderItem,
                })

                if (!resUpdateOrderItem)
                    throw new ApiError(400, "Update order item failed")

                return orderItemId
            }))
        } else if (orderStatus.title == "Đã nhận hàng") {
            order.orderItemsId = order.orderItemsId.map(orderItem => {
                // update borrowDate and returnDate for orderItem
                const borrowDate = new Date()
                let returnDate = new Date(borrowDate)
                returnDate.setDate(returnDate.getDate() + orderItem.borrowingTime)
                orderItem.borrowDate = borrowDate
                orderItem.returnDate = returnDate
                return orderItem
            })

            // handle return product
            // get all productId, returnDate, borrowDate of orederItemsId
            const returnProducts = order.orderItemsId.map(orderItem => {
                return {
                    userId: order.userId,
                    productId: orderItem.productId,
                    returnDate: orderItem.returnDate,
                    borrowDate: orderItem.borrowDate,
                    quantity: orderItem.quantity,
                }
            })

            // create returnProduct
            const resCreateReturnProduct = await Promise.all(returnProducts.map(async (returnProduct) => {
                const res = await service.ReturnProduct.create(returnProduct)
                return res
            }));

            if (!resCreateReturnProduct)
                throw new ApiError(400, "Create return product failed")
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