const { userRepo } = require("./user.repository");
const { created, updated, deleted } = require('./user.events')

module.exports.create = async function (req, res)  {
    var user = req.user;
    var data = req.body;
    try{
        var user = await userRepo.create(user, data);
        created(user)
        return res.api(
            200,
            'user.created',
            {
                user
            }
        );
    }catch(e){
        throw Error(e);
    }  
}

module.exports.details = async function(req, res) {
    var user = req.user;
    try{
        var user = await userRepo.details(user);
        return res.api(
            200,
            'user.details',
            {
                user
            }
        );
    }catch(e){
        throw Error(e);
    }
}   

module.exports.update = async function(req, res) {
    var user = req.user;
    var data = req.body;
    try{
        var user = await userRepo.update(user,data);
        updated(user);
        return res.api(
            200,
            'user.updated',
            {
                user
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.delete = async function(req, res) {

    var user = req.user;
    try{
        var user = await userRepo.delete(user);
        deleted(user);
        return res.api(
            200,
            'user.deleted',
            {
                user
            }
        );
    }catch(e){
        throw Error(e);
    }
}