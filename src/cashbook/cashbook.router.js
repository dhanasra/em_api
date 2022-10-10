const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, update, details, list,delete:cashbookDelete } = require('./cashbook.controller');

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, list);
router.get('/:id',details);
router.put('/:id',update);
router.delete('/:id',cashbookDelete);

module.exports.cashbookRouter = router