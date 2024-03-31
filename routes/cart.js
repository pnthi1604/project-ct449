const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route("/add-to-cart")
    .post(middleware.auth.userAuth, controller.Cart.add)

router.route("/")
    .get(middleware.auth.userAuth, controller.Cart.getAll)
    .post(middleware.auth.userAuth, controller.Cart.update)
    .delete(middleware.auth.userAuth, controller.Cart.delete)

module.exports = router;