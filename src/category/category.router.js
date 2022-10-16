const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, update, details, list,delete:categoryDelete } = require('./category.controller');

const router = express.Router();

router.post('/:id', verifyToken, create);
router.get('/cashbook/:id', verifyToken, list);
router.get('/cashbook/:id/category/:categoryId', verifyToken, details);
router.put('/cashbook/:id', verifyToken, update);
router.delete('/cashbook/:id/category/:categoryId', verifyToken, categoryDelete);

module.exports.categoryRouter = router