const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .post(middleware.auth.userAuth, controller.Order.create)

router.route('/admin')
    .get(middleware.auth.adminAuth, controller.Order.getAll)

router.route("/admin/:adminId/:userId")
    .put(middleware.auth.adminAuth, controller.Order.update)

router.route("/:userId")
    .get(middleware.auth.userAuth, controller.Order.getAllByUserId)

module.exports = router;