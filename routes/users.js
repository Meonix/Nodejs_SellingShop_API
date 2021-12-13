const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')
const auth = require('../middleware/auth')

router.post('/Register', userController.register)

router.post('/Login', userController.login)

router.post('/Update',auth, userController.updateUser)

router.post('/Delete', userController.deleteUser)

router.post('/getUser', userController.getUserFromId)

router.post('/GetListUser', userController.getListUser)

router.post('/Logout', auth, userController.logout)

module.exports=router