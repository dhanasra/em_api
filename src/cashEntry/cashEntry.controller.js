const { cashEntryRepo } = require("./cashEntry.repository");
const { created, updated, deleted } = require('./cashEntry.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    var cashEntries = await cashEntryRepo.list(id);
    return res.api(
        200,
        'category.listed',
        {
            cashEntries
        }
    );
}


module.exports.create = async function (req, res)  {
    const { id } = req.params;
    var data = req.body;
    var cashEntry = await cashEntryRepo.create(id,data);
    created(cashEntry);
    return res.api(
        200,
        'cashEntry.created',
        {
            cashEntry
        }
    );
}

module.exports.details = async function(req, res) {
    const { id, cashEntryId } = req.params;
    var cashEntry = await cashEntryRepo.details(id, cashEntryId);
    return res.api(
        200,
        'cashEntry.details',
        {
            cashEntry
        }
    );
}

module.exports.update = async function(req, res) {
    const { id, cashEntryId } = req.params;
    var data = req.body;
    var cashEntry = await cashEntryRepo.update(id,cashEntryId,data);
    updated(cashEntry);
    return res.api(
        200,
        'cashEntry.updated',
        {
            cashEntry
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id, cashEntryId } = req.params;
    var deletedId = await cashEntryRepo.delete(id, cashEntryId);
    deleted(deletedId);
    return res.api(
        200,
        'category.deleted'
    );
}