const express = require('express');
const controller = require('../controllers/index.js');

const router = express.Router();

router.route('/register').post(controller.Auth.register);
router.route('/login').post(controller.Auth.login);
router.route('/logout').get(controller.Auth.logout);

module.exports = router;