const express = require('express');
const { getUsers, createUser} = require('../controllers/users/controller');
const { login } = require('../controllers/users/auth/login')
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/auth/login', login);
module.exports = router

