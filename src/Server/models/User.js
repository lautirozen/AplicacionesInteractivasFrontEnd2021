
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    usuario:{
        type: String, required: true
    },
    nombre:{
        type: String, required: true
    },

    apellido:{
        type: String, required: true
    },

    Email:{
        type: String, required: true, unique: true
    },

    preguntaSegura:{
        type: String, required: true
    },

    respuestaSegura:{
        type: String, required: true
    },

    contraseña:{
        type: String, required: true
    }

},
{ collection: 'users' },
{timeStamp : true})

const User = mongoose.model('User', userSchema)
module.exports = User
