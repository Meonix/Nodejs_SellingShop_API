const { Int32 } = require('bson')
const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    id_user : {
        type : String,
        require : true
    },
    products: [{
        id_product : {
            type : String,
            require : true
        },
        price:{
            type : Number,
            require : true
        },
        quantity : {
            type : Number,
            require : true
        }
    }],
    total : {
        type : Number,
        require : true
    },
    date : {
        type : Date,
        require : true
    }
})

CartSchema.statics.getDate = async function () {
    let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        return day+"/"+month+"/"+year
}


const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart