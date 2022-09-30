const express = require('express');
const { create, list, details, update, delete:cashEntryDelete} = require('./cashEntry.controller');

const router = express.Router();

router.post('/:id', create);
router.get('/cashbook/:id', list);
router.get('/cashbook/:id/cashEntry/:cashEntryId',details);
router.put('/cashbook/:id/cashEntry/:cashEntryId',update);
router.delete('/cashbook/:id/cashEntry/:cashEntryId',cashEntryDelete);

module.exports.cashEntryRouter = router