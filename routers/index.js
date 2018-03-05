const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index_controller');

router.get('/', indexController.index_home);

router.get('/login', indexController.index_login);

router.post('/login', indexController.index_login_user);

router.get('/signup', indexController.index_signup);

router.post('/signup', indexController.index_create_user);

module.exports = router;