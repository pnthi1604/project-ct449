const express = require('express');
const {
    UserController,
} = require('../controllers/index.js');
const {
    authMiddleware
} = require('../middleware/index.js')

const router = express.Router();

router.route('/')
    .get(authMiddleware.adminAuth, UserController.getAll)
    .post(UserController.create)

router.route('/:id')
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.delete)

module.exports = router;