const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")
const cartController = require("../controllers/cartController")
const userController = require("../controllers/userControllers")
const orderController = require("../controllers/orderController")
const { authentication } = require('../middleware/authentication')


router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)


module.export = router



