const express = require('express')
const router = express.Router()
const cartController = require('../app/controllers/CartController')

router.get('/AddCart', cartController.addCart)

module.exports=router