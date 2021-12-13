const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/ProductController')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      let image_url = file.originalname
      cb(null, image_url )
    }
  })

var upload = multer({ storage: storage })

router.post('/AddProduct',upload.single('image'), productController.addProduct)

router.post('/UpdateProduct',upload.single('image'), productController.updateProduct)

router.post('/DeleteProduct',upload.single('image'), productController.deleteProduct)

router.post('/getProduct',upload.single('image'), productController.getProductFromId)

router.post('/GetListProducts',upload.single('image'), productController.getListProducts)

module.exports=router