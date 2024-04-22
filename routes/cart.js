const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route("/:userId")
    .get(middleware.auth.userAuth, controller.Cart.getAll)

router.route("/cart/:id")
    .get(middleware.auth.userAuth, controller.Cart.getById)

router.route("/add-cart/:userId/:productId")
    .post(middleware.auth.userAuth, controller.Cart.add)

router.route("/:userId/:productId")
    .post(middleware.auth.userAuth, controller.Cart.update)
    .delete(middleware.auth.userAuth, controller.Cart.delete)

module.exports = router