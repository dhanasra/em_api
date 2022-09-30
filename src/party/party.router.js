const express = require('express');
const { create, update, details, list,delete:partyDelete } = require('./party.controller');

const router = express.Router();

router.post('/', create);
router.get('/user/:id', list);
router.get('/user/:id/party/:partyId',details);
router.put('/user/:id',update);
router.delete('/user/:id/party/:partyId',partyDelete);

module.exports.partyRouter = router