const { categoryRepo } = require("./category.repository");
const { created, updated, deleted } = require('./category.events')

module.exports.list = async function (req, res)  {
    const { id } = req.params;
    var categories = await categoryRepo.list(id);
    return res.api(
        200,
        'category.listed',
        {
            categories
        }
    );
}


module.exports.create = async function (req, res)  {
    var data = req.body;
    var category = await categoryRepo.create(data);
    created(category);
    return res.api(
        200,
        'category.created',
        {
            category
        }
    );
}

module.exports.details = async function(req, res) {
    const { id, categoryId } = req.params;
    var category = await categoryRepo.details(id, categoryId);
    return res.api(
        200,
        'category.details',
        {
            category
        }
    );
}

module.exports.update = async function(req, res) {
    const { id } = req.params;
    var data = req.body;
    var category = await categoryRepo.update(id,data);
    updated(category);
    return res.api(
        200,
        'category.updated',
        {
            category
        }
    );
}

module.exports.delete = async function(req, res) {
    const { id, categoryId } = req.params;
    var deletedId = await categoryRepo.delete(id, categoryId);
    deleted(deletedId);
    return res.api(
        200,
        'category.deleted'
    );
}