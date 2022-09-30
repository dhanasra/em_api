const express = require('express');
const { create, update, details, list,delete:cashbookDelete } = require('./cashbook.controller');

const router = express.Router();

router.post('/', create);
router.get('/user/:id', list);
router.get('/:id',details);
router.put('/:id',update);
router.delete('/:id',cashbookDelete);

module.exports.cashbookRouter = router