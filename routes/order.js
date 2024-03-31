const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(middleware.auth.adminAuth, controller.User.getAll)
    .post(controller.User.create)

router.route('/:id')
    .get(controller.User.getById)
    .put(controller.User.update)
    .delete(controller.User.delete)

module.exports = router;