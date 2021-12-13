const User = require('../models/User')

class UserController {

    async register(req, res) {
        console.log(req.body)
        const user = new User({ username: req.body.username, password: req.body.password, name: req.body.name, address: req.body.address, phone: req.body.phone })
        const _id = user._id
        const username = user.username
        const name = user.name
        const address = user.address
        const phone = user.phone
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ data: { _id, username, name, address, phone, token }, error: null })
    }

    async login(req, res) {
        const { username, password } = req.body
        const user = await User.findByCredentials(username, password)
        if (!user) {
            return res.send({ data: null, error: "Incorrect username or password" })
        }
        const token = await user.generateAuthToken()
        const _id = user._id
        const name = user.name
        const address = user.address
        const phone = user.phone
        res.send({ data: { _id, username, name, address, phone, token }, error: null })
    }

    async updateUser(req, res){
        const id = req.body.id;
        const name = req.body.name;
        const address = req.body.address;
        const phone = req.body.phone;
        const user = await User.findByIdAndUpdate({_id : id},{name, address, phone}, function(err){
            if(err){
               return res.send({ data: null, error: "update user error"})
            }
        })

        res.send({data:user, error:null})

    }

    async deleteUser(req, res){
        const id = req.body.id;
        const user = await User.findOneAndDelete({_id : id}, function(err){
            if(err){
               return res.send({ data: null, error: "delete user error"})
            }
        })

        res.send({data:"delete success", error:null})

    }

    async getListUser(req, res) {
        const listUser = await User.find({}, { _id: 1, name: 1, address: 1, phone: 1 })
        if (listUser == null) {
            return res.send({ data: null, error: "Account not found" })
        }
        res.send({ data: { listUser }, error: null })
    }

    async getUserFromId(req, res) {
        var id_user = req.body.id
        var user = await User.findOne({ _id: id_user }, function (err) {
            if (err) {
                return res.send({ data: null, error: "Account not found" })
            }
        })
        if (user) {
            const token = user.tokens[user.tokens.length - 1].token
            const _id = user._id
            const username = user.username
            const name = user.name
            const address = user.address
            const phone = user.phone
            res.send({ data: { _id, username, name, address, phone, token }, error: null })
        }
    }
    
    async logout(req, res) {
        req.user.tokens = await req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({ data: { message: 'Logout Success' }, error: null })
    }
}

module.exports = new UserController