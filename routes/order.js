const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .post(middleware.auth.userAuth, controller.Order.create)

router.route('/admin')
    .get(middleware.auth.adminAuth, controller.Order.getAll)

router.route("/admin/:adminId/:id")
    .put(middleware.auth.adminAuth, controller.Order.update)

router.route("/user/:id")
    .get(middleware.auth.userAuth, controller.Order.getAllByUserId)
    .put(middleware.auth.userAuth, controller.Order.update)

router.route('/:orderId')
    .get(middleware.auth.userOrAdminAuth, controller.Order.getById)

module.exports = router;