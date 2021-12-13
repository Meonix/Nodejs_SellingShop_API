const Cart = require('../models/Cart')

class CartController{
    async addCart(req, res){
         const id_user = req.body.id_user
         const products = req.body.products
         const total = req.body.total
        let date = Cart.getDate()
        const cart = new Cart({id_user, products, total})
        await cart.save()
        res.send({data:"order success", error:null})
    }

    async deleteCart(req, res){
        const _id = req.body._id
        const cart = await Cart.findByIdAndDelete({_id:_id})
        if(!cart){
            return res.send({data:null, error:"not find order"})
        }
        res.send({data:"delete success", error:null})
    }

    async getOrderFromId(req, res){
        const _id = req.body._id
        const cart = await Cart.findById({_id:_id})
        if(!cart){
            return res.send({data:null, error:"not find order"})
        }
        res.send({data:cart, error:null})
    }

    async getListOrder(req, res){
        const _id = req.body._id
        const cart = await Cart.find({})
        res.send({data:cart, error:null})
    }
   
}


module.exports = new CartController