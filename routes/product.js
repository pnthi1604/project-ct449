const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.Product.getAll)
    .post(controller.Product.create)

router.route('/:id')
    .get(controller.Product.getById)
    .put(controller.Product.update)
    .delete(controller.Product.delete)

router.route("/publisher/:id")
    .get(controller.Product.getPublisher)

module.exports = router;