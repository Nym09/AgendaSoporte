const express = require('express');
const router = express.Router();

router.use('/auth', require('./routes_auth'));
router.use('/empleados', require('./routes_users'));

module.exports = router;