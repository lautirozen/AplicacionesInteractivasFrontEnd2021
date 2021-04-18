const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const path = require('path')

mongoose.connect('mongodb://localhost:27017/cocinadb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
//mongoose.connect('mongodb://localhost:3000/cocinadb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection


const app = express()

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/api/test', async (req, res) => {
	res.send(200,{status:"Funciona"})
})

app.post('/api/testpost', async (req, res) => {
	console.log(req.body)
	res.send(200,{status:"Funciona"})
})


app.post('/api/register', async (req, res) => {
    /*nombre:req.body.nombre,
        
            apellido:req.body.apellido,
        
            Email: req.body.Email,
        
            preguntaSegura: req.body.preguntaSegura,
        
            respuestaSegura:req.body.respuestaSegura,
        
            // eslint-disable-next-line no-undef
            password:hashedPass*/
	const { usuario,nombre,apellido,email, contraseña: contraseñaTextoPlano ,pregunta,respuesta} = req.body
/* confirmacion de lado de backend innecessario de adapatar ejemplo ya que lo hacemos en el frontend
	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}*/

	const contraseña = await bcrypt.hash(contraseñaTextoPlano, 10)

	try {
		const response = await User.create({
			usuario,
			nombre,
            apellido,
            email,
            contraseña,
            pregunta,
            respuesta
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('server is running on port ${PORT}')
})
