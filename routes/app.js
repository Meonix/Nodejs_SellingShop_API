const usersRoutes = require('./users')
const productRouter = require('./Products')
const cartRouter = require('./Cart')

function route(app){

    app.use('/User', usersRoutes)
    app.use('/Product', productRouter)
    app.use('/Cart', cartRouter)
   
}

module.exports = route
