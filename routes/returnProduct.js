const express = require('express');
const controller = require('../controllers/index.js');
const middleware = require('../middleware/index.js')

const router = express.Router();

router.route("/")
    .get(middleware.auth.userAuth, controller.ReturnProduct.getAll)
    .post(middleware.auth.userOrAdminAuth, controller.ReturnProduct.create)

router.route("/user/:id")
    .get(middleware.auth.userAuth, controller.ReturnProduct.getByUserId)

router.route("/:id")
    .get(middleware.auth.userAuth, controller.ReturnProduct.getById)
    .put(middleware.auth.userOrAdminAuth, controller.ReturnProduct.update)    

module.exports = router;