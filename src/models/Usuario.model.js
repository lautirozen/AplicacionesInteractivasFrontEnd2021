var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const { string } = require('yup/lib/locale')


var UserSchema = new mongoose.Schema({
    Usuario: String,
    Rol: String,
    // buscar los datos de usuario y ponerlos aca no olvidarse del rol
})

UserSchema.plugin(mongoosePaginate)
const Usuario = mongoose.model('Usuario',UserSchema)

module.exports = Usuario;