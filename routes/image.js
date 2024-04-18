const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route('/:id')
    .get(middleware.auth.adminAuth, controller.Image.getById)
    .delete(middleware.auth.adminAuth, controller.Image.delete)

router.route('/')
    .post(middleware.auth.adminAuth, middleware.uploadFile, controller.Image.create)

module.exports = router