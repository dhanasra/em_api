const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, update, details, list,delete:partyDelete } = require('./party.controller');

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/user/:id', verifyToken, list);
router.get('/user/:id/party/:partyId', verifyToken, details);
router.put('/user/:id', verifyToken, update);
router.delete('/user/:id/party/:partyId', verifyToken, partyDelete);

module.exports.partyRouter = router