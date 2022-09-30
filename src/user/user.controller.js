const { userRepo } = require("./user.repository");
const { created, updated, deleted } = require('./user.events')

module.exports.create = async function (req, res)  {
    var data = req.body;
    var user = await userRepo.create(data);
    created(user)
    return res.api(
        200,
        'user.created',
        {
            user
        }
    );
}

module.exports.details = async function(req, res) {
    const { id } = req.params;
    var user = await userRepo.details(id);
    return res.api(
        200,
        'user.details',
        {
            user
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var user = await userRepo.update(id,data);
    updated(user);
    return res.api(
        200,
        'user.updated',
        {
            user
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id } = req.params;
    var userId = await userRepo.delete(id);
    deleted(userId);
    return res.api(
        200,
        'user.deleted'
    );
}