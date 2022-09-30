const express = require('express');

const { create, update, details, delete:userDelete } = require('./user.controller');

const router = express.Router();

router.post('/', create);
router.get('/:id',details);
router.put('/:id',update);
router.delete('/:id',userDelete);

module.exports.userRouter = router