const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(controller.ProductController.getAll)
    .post(controller.ProductController.create)

router.route('/:id')
    .get(controller.ProductController.getById)
    .put(controller.ProductController.update)
    .delete(controller.ProductController.delete)

router.route("/publisher/:id")
    .get(controller.ProductController.getPublisher)

module.exports = router;