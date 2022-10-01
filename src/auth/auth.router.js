const express = require('express');
const { register, login, verifyToken } = require('./auth.controller');

const router = express.Router()


router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyToken);

module.exports.authRouter = router;