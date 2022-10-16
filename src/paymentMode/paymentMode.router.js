const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, update, details, list,delete:paymentModeDelete } = require('./paymentMode.controller');

const router = express.Router();

router.post('/:id', verifyToken, create);
router.get('/cashbook/:id', verifyToken, list);
router.get('/cashbook/:id/paymentMode/:paymentModeId', verifyToken, details);
router.put('/cashbook/:id', verifyToken, update);
router.delete('/cashbook/:id/paymentMode/:paymentModeId', verifyToken, paymentModeDelete);

module.exports.paymentModeRouter = router 