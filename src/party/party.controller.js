const { partyRepo } = require("./party.repository");
const { created, updated, deleted } = require('./party.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    var parties = await partyRepo.list(id);
    return res.api(
        200,
        'party.listed',
        {
            parties
        }
    );
}


module.exports.create = async function (req, res)  {
    var user = req.user;
    const data = req.body;
    try{
        var party = await partyRepo.create(user, data);
        created(party);
        return res.api(
            200,
            'party.created',
            {
                party
            }
        );
    }catch(e){
        throw(e);
    }
}

module.exports.details = async function(req, res) {
    const { id, partyId } = req.params;
    var party = await partyRepo.details(id, partyId);
    return res.api(
        200,
        'party.details',
        {
            party
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var party = await partyRepo.update(id,data);
    updated(party);
    return res.api(
        200,
        'party.updated',
        {
            party
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id, partyId } = req.params;
    var deletedId = await partyRepo.delete(id, partyId);
    deleted(deleted);
    return res.api(
        200,
        'party.deleted'
    );
}