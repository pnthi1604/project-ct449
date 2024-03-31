const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(middleware.auth.adminAuth, controller.Employee.getAll)
    .post(middleware.auth.adminAuth, controller.Employee.create)

router.route('/:id')
    .get(middleware.auth.adminAuth, controller.Employee.getById)
    .put(middleware.auth.adminAuth, controller.Employee.update)
    .delete(middleware.auth.adminAuth, controller.Employee.delete)

module.exports = router;