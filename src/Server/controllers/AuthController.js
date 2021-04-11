const bcrypt = require('bcryptjs')

const jws = require('jsonwebtoken')
const User = require('../models/User')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
    })
    let user = new User({
            nombre:req.body.nombre,
        
            apellido:req.body.apellido,
        
            Email: req.body.Email,
        
            preguntaSegura: req.body.preguntaSegura,
        
            respuestaSegura:req.body.respuestaSegura,
        
            // eslint-disable-next-line no-undef
            password:hashedPass
        })

    user.save()
    .then(user => {
        res.json({
            message :'User Added successfully'
        })
    })
    .catch(user => {
        res.json({
            message :'an error ocurred'
        })
    })
}

module.exports = {register}