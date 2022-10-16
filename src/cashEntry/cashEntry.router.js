const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, list, details, update, delete:cashEntryDelete} = require('./cashEntry.controller');

const router = express.Router();

router.post('/:id', verifyToken, create);
router.get('/CB/:id', verifyToken, list);
router.get('/:cashEntryId/CB/:id', verifyToken, details);
router.put('/:cashEntryId/CB/:id', verifyToken, update);
router.delete('/:cashEntryId/CB/:id', verifyToken, cashEntryDelete);

module.exports.cashEntryRouter = router