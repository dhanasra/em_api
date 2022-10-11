const { cashbookRepo } = require("./cashbook.repository");
const { created, updated, deleted } = require('./cashbook.events')

module.exports.list = async function (req, res)  {
    var user = req.user;
    try{
        var cashbooks = await cashbookRepo.list(user);
        return res.api(
            200,
            'cashbook.listed',
            {
                cashbooks
            } 
        );
    }catch(e){
        throw Error(e);
    }  
}


module.exports.create = async function (req, res)  {
    var user = req.user;
    var data = req.body;
    try{
        var cashbook = await cashbookRepo.create(user, data);
        created(cashbook);
        return res.api(
            200,
            'cashbook.created',
            {
                cashbook
            }
        );
    }catch(e){
        throw Error(e);
    }  
}

module.exports.details = async function(req, res) {
    const { id } = req.params;

    try{
        var cashbook = await cashbookRepo.details(id);
        return res.api(
            200,
            'cashbook.details',
            {
                cashbook
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;

    try{
        var cashbook = await cashbookRepo.update(id,data);
        updated(cashbook);
        return res.api(
            200,
            'cashbook.updated',
            {
                cashbook
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.delete = async function(req, res) {
    const { id } = req.params;

    try{
        var cashbookId = await cashbookRepo.delete(id);
        deleted(cashbookId);
        return res.api(
            200,
            'cashbook.deleted'
        );
    }catch(e){
        throw Error(e);
    }
}