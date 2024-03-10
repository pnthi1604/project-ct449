const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route("/add-to-cart")
    .post(middleware.authMiddleware.userAuth, controller.CartController.add)

router.route("/")
    .get(middleware.authMiddleware.userAuth, controller.CartController.getAll)
    .post(middleware.authMiddleware.userAuth, controller.CartController.update)
    .delete(middleware.authMiddleware.userAuth, controller.CartController.delete)

module.exports = router;