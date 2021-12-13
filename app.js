const express = require('express')
const app = express()
const db = require('./config/configDb')
require('dotenv/config')
const route = require('./routes/app')


db.connect()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

route(app)


app.listen(process.env.PORT)