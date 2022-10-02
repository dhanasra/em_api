const { cashbookRepo } = require("./cashbook.repository");
const { created, updated, deleted } = require('./cashbook.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    var cashbooks = await cashbookRepo.list(id);
    return res.api(
        200,
        'cashbook.listed',
        {
            cashbooks
        }
    );
}


module.exports.create = async function (req, res)  {
    const { id } = req.params;
    var data = req.body;
    var cashbook = await cashbookRepo.create(id, data);
    created(cashbook);
    return res.api(
        200,
        'cashbook.created',
        {
            cashbook
        }
    );
}

module.exports.details = async function(req, res) {
    const { id } = req.params;
    var cashbook = await cashbookRepo.details(id);
    return res.api(
        200,
        'cashbook.details',
        {
            cashbook
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var cashbook = await cashbookRepo.update(id,data);
    updated(cashbook);
    return res.api(
        200,
        'cashbook.updated',
        {
            cashbook
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id } = req.params;
    var cashbookId = await cashbookRepo.delete(id);
    deleted(cashbookId);
    return res.api(
        200,
        'cashbook.deleted'
    );
}