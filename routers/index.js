const express = require('express');
const _ = require('lodash');
const router = express.Router();

const indexController = require('../controllers/index_controller');

router.get('/', (req, res) => {
    res.status(202).render('index', {title: 'home'});
});

router.get('/login', (req, res) => {
    res.status(202).render('login', {title: 'Login'});
});

router.post('/login', (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);

    indexController.index_login_user(body)
        .then(user => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.render('login', {title: 'login', error: err});
        });
});

router.get('/signup', (req, res) => {
    res.status(202).render('signup', {title: 'Sign Up'});
});

router.post('/signup', (req, res, next) => {
    const body = _.pick(req.body, ["email", "username", "password", "passwordConf"]);
    
    indexController.index_create_user(body)
        .then(user => {
            res.redirect('/');
        })
        .catch(err => {
            res.render('login', {title: 'title', error: err});
        });

});

module.exports = router;