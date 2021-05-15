var express = require('express');
var router = express.Router()
var UserController = require('../controllers/usuario.controller')

router.get('/test', function(req, res, next) {
    res.send('llegue a la ruta api/user');
});

// aca va para los controllers de usuario controller definido arriba necesito crear estos 3 si aun no los hice
router.post('/registration',UserController.createUser)
router.post('/login/',UserController.loginUsuario)
router.get('/users', UserController.getUsers)