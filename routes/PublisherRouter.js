const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(middleware.authMiddleware.adminAuth, controller.UserController.getAll)
    .post(controller.UserController.create)

router.route('/:id')
    .get(controller.UserController.getById)
    .put(controller.UserController.update)
    .delete(controller.UserController.delete)

module.exports = router;