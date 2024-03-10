const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(middleware.authMiddleware.adminAuth, controller.EmployeeController.getAll)
    .post(middleware.authMiddleware.adminAuth, controller.EmployeeController.create)

router.route('/:id')
    .get(middleware.authMiddleware.adminAuth, controller.EmployeeController.getById)
    .put(middleware.authMiddleware.adminAuth, controller.EmployeeController.update)
    .delete(middleware.authMiddleware.adminAuth, controller.EmployeeController.delete)

module.exports = router;