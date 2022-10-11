const express = require('express');
const { verifyToken } = require('../auth/auth.controller');
const { create, update, details,delete:memberDelete } = require('./member.controller');

const router = express.Router();

router.post('/CB/:id', verifyToken, create);
router.get('/:id', verifyToken, details);
router.put('/CB/:id', verifyToken, update);
router.delete('/:memberId/CB/:id', verifyToken, memberDelete);

module.exports.memberRouter = router