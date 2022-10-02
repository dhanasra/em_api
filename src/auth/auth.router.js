const express = require('express');
const { register, login, verifyToken, getAccessToken, googleLogin } = require('./auth.controller');

const router = express.Router()


router.post('/register', register);
router.post('/login', login);
router.post('/access-token', getAccessToken);

module.exports.authRouter = router;