const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index_controller');

router.get('/', indexController.index_home);

router.get('/login', indexController.index_login);

module.exports = router;