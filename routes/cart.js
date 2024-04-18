const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route("/:userId")
    .get(middleware.auth.userAuth, controller.Cart.getAll)
    // .delete(middleware.auth.userAuth, controller.Cart.deleteAll)

router.route("/:userId/:productId")
    .post(middleware.auth.userAuth, controller.Cart.update)

router.route("/add-to-cart/:userId/:productId")
    .post(middleware.auth.userAuth, controller.Cart.add)

router.route("/:cartId")
    .delete(middleware.auth.userAuth, controller.Cart.delete)

module.exports = router