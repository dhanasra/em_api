const express = require('express');
const { create, update, details, list,delete:paymentModeDelete } = require('./paymentMode.controller');

const router = express.Router();

router.post('/', create);
router.get('/cashbook/:id', list);
router.get('/cashbook/:id/paymentMode/:paymentModeId',details);
router.put('/cashbook/:id',update);
router.delete('/cashbook/:id/paymentMode/:paymentModeId',paymentModeDelete);

module.exports.paymentModeRouter = router