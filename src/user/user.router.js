const express = require('express');

const { verifyToken } = require('../auth/auth.controller');
const { create, update, details, delete:userDelete } = require('./user.controller');

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, details);
router.put('/', verifyToken, update);
router.delete('/',verifyToken, userDelete);

module.exports.userRouter = router