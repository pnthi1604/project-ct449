const express = require('express');
const {
    EmployeeController,
} = require('../controllers/index.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.route('/')
    .get(EmployeeController.getAll)
    .post(EmployeeController.create)

router.route('/:id')
    .get(EmployeeController.getById)
    .put(EmployeeController.update)
    .delete(auth.adminAuth, EmployeeController.delete)

module.exports = router;