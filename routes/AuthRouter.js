const express = require('express');
const {
    AuthController,
} = require('../controllers/index.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.route('/register').get(AuthController.register);
router.route('/login').get(AuthController.login);
router.route('/logout').get(AuthController.logout);

module.exports = router;