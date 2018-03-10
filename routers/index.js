const express = require('express');
const _ = require('lodash');
const router = express.Router();

const indexController = require('../controllers/index_controller');

router.get('/', (req, res) => {
    res.status(202).render('index', {
        title: 'home',
        user: req.session.userInfo
    });
});

router.get('/login', (req, res) => {
    res.status(202).render('login', {
        title: 'Login',
        user: req.session.user
    });
});

router.post('/login', async (req, res, next) => {
    const body = _.pick(req.body, ["email", "password"]);

    try {
        var user = await indexController.index_login_user(body);
    } catch (err) {
        return res.render('login', {
            title: 'login',
            user: req.session.user,
            error: err
        });
    }

    req.session.login(user, function (err) {
        if (err) {
            let error = new Error('There was an error logging in. Please try again later.');
            next(error);
        } else {
            res.redirect('/user/profile');
        }
    });
});

router.get('/signup', (req, res) => {
    res.status(202).render('signup', {
        title: 'Sign Up',
        user: req.session.user
    });
});

router.post('/signup', (req, res, next) => {
    const body = _.pick(req.body, ["email", "username", "password", "passwordConf"]);

    indexController.index_create_user(body)
        .then(user => {
            res.redirect('/login');
        })
        .catch(err => {
            res.render('login', {
                title: 'title',
                user: req.session.user,
                error: err
            });
        });

});

module.exports = router;