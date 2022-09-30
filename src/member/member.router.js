const express = require('express');
const { create, update, details,delete:memberDelete } = require('./member.controller');

const router = express.Router();

router.post('/cashbook/:id', create);
router.get('/:id', details);
router.put('/cashbook/:id',update);
router.delete('/cashbook/:id/member/:memberId',memberDelete);

module.exports.memberRouter = router