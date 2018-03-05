const _ = require('lodash');

const User = require('../models/user');

const index_home = (req, res) => {
    res.status(202).render('index', {title: 'home'});
};

const index_login = (req, res) => {
    res.status(202).render('login', {title: 'Login'});
};

const index_login_user = (req, res, next) => {
    const body = _.pick(req.body, ["email", "password"]);

    if (Object.keys(body).length !== 2) {
        let error = new Error('Fill the form correctly');
        return res.status(422).render('login', {title: "Login", error: error});
    }

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            console.log(user);
            res.status(302).redirect('/');
        })
        .catch(err => {
            let error = new Error('Wrong email or password');
            res.status(422).render('login', {title: "login", error: error});
        }); 
};

const index_signup = (req, res) => {
    res.status(202).render('signup', {title: 'Sign Up'});
};

const index_create_user = (req, res, next) => {
    const body = _.pick(req.body, ["email", "username", "password", "passwordConf"]);
    if (Object.keys(body).length !== 4) {
        let error = new Error('Fill up the form correctly')
        return res.status(422).render('signup', {error: error, title: 'Sign Up'});
    }
    if (body.password !== body.passwordConf) {
        let error = new Error(`Passwords doesn't match`);
        console.log(error.message);
        return res.status(422).render('signup', {error: error, title: 'Sign Up'});
    }

    const user = new User({
        email: body.email,
        username: body.username,
        password: body.password
    });

    user.save()
        .then(() => {
            res.status(201).redirect('/');
        })
        .catch(err => {
            console.log(err);
            let error = new Error('Somehting wrong with the server. Try again letter');
            next(error);
        });

};

module.exports = { index_home, index_login, index_login_user, index_signup,index_create_user };