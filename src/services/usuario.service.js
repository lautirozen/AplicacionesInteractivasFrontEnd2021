var User = require('../models/Usuario.model');
var bcrypt = require('bcryptsjs');
var jwt = require('jsonwebtoken');

_this= this

exports.getUsers = async function (query, page, limit){

    var options ={
        page, limit
    }
    try{
        console.log("Query", query)
        var Users = await User.paginate(query, options)
        return Users;
    }

    catch (e){
        console.log("error services", e)
        throw Error("Error al paginar usuarios")
    }

}