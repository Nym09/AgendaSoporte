const express = require('express');
const router = express.Router();

const { auth_login } = require('../controller/authcontroller');

router.post('/login', auth_login);

module.exports = router;