const { cashEntryRepo } = require("./cashEntry.repository");
const { created, updated, deleted } = require('./cashEntry.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    try{
        var cashEntries = await cashEntryRepo.list(id);
        return res.api(
            200,
            'category.listed',
            {
                cashEntries
            }
        );
    }catch(e){
        throw Error(e);
    }
}


module.exports.create = async function (req, res)  {
    const { id } = req.params;
    var data = req.body;
    try{
        var cashEntry = await cashEntryRepo.create(id,data);
        created(cashEntry);
        return res.api(
            200,
            'cashEntry.created',
            {
                cashEntry
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.details = async function(req, res) {
    const { id, cashEntryId } = req.params;

    try{
        var cashEntry = await cashEntryRepo.details(id, cashEntryId);
        return res.api(
            200,
            'cashEntry.details',
            {
                cashEntry
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.update = async function(req, res) {
    const { id, cashEntryId } = req.params;
    var data = req.body;

    try{
        var cashEntry = await cashEntryRepo.update(id,cashEntryId,data);
        updated(cashEntry);
        return res.api(
            200,
            'cashEntry.updated',
            {
                cashEntry
            }
        );
    }catch(e){
        throw Error(e);
    }
}

module.exports.delete = async function(req, res) {
    const { id, cashEntryId } = req.params;

    try{
        var deletedId = await cashEntryRepo.delete(id, cashEntryId);
        deleted(deletedId);
        return res.api(
            200,
            'category.deleted'
        );
    }catch(e){
        throw Error(e);
    }
}