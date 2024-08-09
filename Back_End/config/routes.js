
const express = require('express')
const router = express.Router()
const userController = require('../app/controller/userCtrl')
const authenticateUser = require('../middleware/authenticateUser')
const product_controller = require('../app/controller/productCtrl')


router.post('/user/register', userController.register)
router.post('/user/login', userController.login)


// products routes
router.post('/products',authenticateUser,product_controller.create)
router.get('/products/list',authenticateUser,product_controller.getAll)
router.delete('/products/:id',authenticateUser,product_controller.delete)
router.put('/products/:id',authenticateUser,product_controller.update)
router.put('/products/undo/:id',authenticateUser,product_controller.undo)
router.get('/products/deleted',authenticateUser,product_controller.getDeleted)



module.exports = router