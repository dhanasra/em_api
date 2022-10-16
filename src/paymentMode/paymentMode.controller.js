const { paymentModeRepo } = require("./paymentMode.repository");
const { created, updated, deleted } = require('./paymentMode.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    var paymentModes = await paymentModeRepo.list(id);
    return res.api(
        200,
        'paymentMode.listed',
        {
            paymentModes
        }
    );
}


module.exports.create = async function (req, res)  {
    const { id } = req.params;
    const data = req.body;
    try{
        var paymentMode = await paymentModeRepo.create(id, data);
        created(paymentMode);
        return res.api(
            200,
            'paymentMode.created',
            {
                paymentMode
            }
        );
    }catch(e){
        throw(e);
    }
}

module.exports.details = async function(req, res) {
    const { id, paymentModeId } = req.params;
    var paymentMode = await paymentModeRepo.details(id, paymentModeId);
    return res.api(
        200,
        'paymentMode.details',
        {
            paymentMode
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var paymentMode = await paymentModeRepo.update(id,data);
    updated(paymentMode);
    return res.api(
        200,
        'paymentMode.updated',
        {
            paymentMode
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id, paymentModeId } = req.params;
    var deletedId = await paymentModeRepo.delete(id, paymentModeId);
    deleted(deletedId);
    return res.api(
        200,
        'paymentMode.deleted'
    );
}