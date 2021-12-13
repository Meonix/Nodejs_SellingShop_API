const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name : {
        type: String,
        require : true
    },
    image : {
        type: String,
        require : true
    },
    price : {
        type: String,
        require : true
    },
    sale_price : {
        type: String,
        require : true
    },
    description : {
        type: String,
        require : true
    }
})


const Product = mongoose.model('product', ProductSchema)

module.exports = Product