const express = require('express');
const controller = require('../controllers/index.js');
const util = require('../utils/index.js');
const middleware = require('../middleware/index.js');

const router = express.Router();

router.route('/')
    .get(controller.Product.getAll)
    .post(middleware.auth.adminAuth, controller.Product.create)

router.route("/admin")
    .get(middleware.auth.adminAuth, controller.Product.getAll)

router.route('/:id')
    .get(controller.Product.getById)
    .put(middleware.auth.adminAuth, controller.Product.update)
    .delete(middleware.auth.adminAuth, controller.Product.delete)

router.route("/publisher/:id")
    .get(middleware.auth.adminAuth, controller.Product.getPublisher)

module.exports = router;