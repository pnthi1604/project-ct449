const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(middleware.auth.adminAuth, controller.Publisher.getAll)
    .post(middleware.auth.adminAuth, controller.Publisher.create)

router.route('/:id')
    .get(middleware.auth.adminAuth, controller.Publisher.getById)
    .put(middleware.auth.adminAuth, controller.Publisher.update)
    .delete(middleware.auth.adminAuth, controller.Publisher.delete)

module.exports = router;