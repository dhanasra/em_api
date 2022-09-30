const { memberRepo } = require("./member.repository");
const { created, updated, deleted } = require('./member.events')

module.exports.create = async function (req, res)  {
    const { id } = req.params;
    var data = req.body;
    var member = await memberRepo.create(id,data);
    created(member);
    return res.api(
        200,
        'member.created',
        {
            member
        }
    );
}

module.exports.details = async function(req, res) {
    const { id } = req.params;
    var member = await memberRepo.details(id);
    return res.api(
        200,
        'member.details',
        {
            member
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var member = await memberRepo.update(id,data);
    updated(member);
    return res.api(
        200,
        'member.updated',
        {
            member
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id, memberId } = req.params;
    var deletedId = await memberRepo.delete(id, memberId);
    deleted(deletedId);
    return res.api(
        200,
        'member.deleted'
    );
}