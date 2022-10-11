const express = require('express');
const { register, login, verifyToken, forgotPassword, getAccessToken, getLoginType } = require('./auth.controller');

const router = express.Router()


router.post('/check', getLoginType);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/login', login);
router.post('/access-token', getAccessToken);

module.exports.authRouter = router;