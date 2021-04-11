const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/cocinadb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log('server is running on port ${PORT}')
})
