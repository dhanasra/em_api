const express = require('express');
const { create, update, details, list,delete:categoryDelete } = require('./category.controller');

const router = express.Router();

router.post('/', create);
router.get('/cashbook/:id', list);
router.get('/cashbook/:id/category/:categoryId',details);
router.put('/cashbook/:id',update);
router.delete('/cashbook/:id/category/:categoryId',categoryDelete);

module.exports.categoryRouter = router