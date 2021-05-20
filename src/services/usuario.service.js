var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.model');


//_this= this

exports.getUsers = async function (query, page, limit){

    var options ={
        page, limit
    }
    try{
        console.log("Query", query)
        var Users = await Usuario.paginate(query, options)
        return Users;
    }

    catch (e){
        console.log("error services", e)
        throw Error("Error al paginar usuarios")
    }

}
exports.getUsers = async function (user){
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUsuario = new Usuario ({
        usuario: user.usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        contraseña: hashedPassword,
        pregunta: user.pregunta,
        respuesta: user.respuesta,
    })   
    try {
        var savedUsuario = await newUsuario.save()
        var token = jwt.sign({
            id: savedUsuario._id
        }, process.env.SECRET,{
            expiresIn: 86400
        });
        return token
    }catch(e) {
        console.log(e)
    }

}