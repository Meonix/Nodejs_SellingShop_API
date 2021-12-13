const Product = require('../models/Product')

class ProductController {
    
    async addProduct(req, res, next) {
        const file = req.file
        const name = req.body.name
        const price = req.body.price
        const sale_price = req.body.sale_price
        const description = req.body.description
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        var image_url = file.originalname
        const product = new Product({name, image_url, price, sale_price, description})
        await product.save()
        res.send({data: product, error: null})
    }

    async updateProduct(req, res){
        const _id = req.body._id
        const file = req.file
        const name = req.body.name
        const price = req.body.price
        const sale_price = req.body.sale_price
        const description = req.body.description
        const filter = {_id : _id}
        const update = {name : name, price: price, sale_price: sale_price, description: description}
        console.log(update);
        const product = await Product.findByIdAndUpdate(filter,update , function(err){
            if(err){
                res.send({data: null, error:"error"})
            }
        })
        if (!product) {
            return res.send({ data: null, error: "Update Fail!!!" })
        }
        res.send({data: product, error:null})
    }

    async deleteProduct(req, res){
        const _id = req.body._id
        const product = await Product.findByIdAndDelete({_id:_id}, function(err){
            if(err){
               return res.send({ data: null, error: "delete product error"})
            }

        })
        if(!product){
            return res.send({ data: null, error: "delete fail"})
        }
        res.send({data:"delete success", error:null})
    }

    async getProductFromId(req, res){
        const _id = req.body._id
        const product = await Product.findById({_id:_id})
        if(!product){
            return res.send({ data: null, error: "Not find product"})
        }
        res.send({data: product, error:null})
    }

    async getListProducts(req, res){
        const product = await Product.find({})
        res.send({data: product, error:null})
    }
}

module.exports = new ProductController