var UserService = require('../services/usuario.service');


//_this = this;

exports.getUsers = async function(req, res, next ) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{
        var Users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({status: 200, data: Users, message: "Successfully User Received"})
    } catch (e) {
        return res.status(400).json({status:400, message: e.message});
    }
}