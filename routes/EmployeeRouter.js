const express = require('express');
const {
    EmployeeController,
} = require('../controllers/index.js');
const {
    authMiddleware
} = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(authMiddleware.adminAuth, EmployeeController.getAll)
    .post(authMiddleware.adminAuth, EmployeeController.create)

router.route('/:id')
    .get(authMiddleware.adminAuth, EmployeeController.getById)
    .put(authMiddleware.adminAuth, EmployeeController.update)
    .delete(authMiddleware.adminAuth, EmployeeController.delete)

module.exports = router;