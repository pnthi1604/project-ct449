const express = require('express');
const controller = require('../controllers/index.js');

const router = express.Router();

router.route('/register').get(controller.AuthController.register);
router.route('/login').get(controller.AuthController.login);
router.route('/logout').get(controller.AuthController.logout);

module.exports = router;