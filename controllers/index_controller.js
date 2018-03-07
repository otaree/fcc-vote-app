const User = require('../models/user');
const _ = require('lodash');

const index_login_user = body => {
    const body_arr = _.values(body).filter((item) => item.trim() !== '');
    if (body_arr.length != 2) {
        let error = new Error('Fill the form correctly');
        return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
        User.findByCredentials(body.email, body.password)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                let error = new Error('Wrong email or password');
                reject(error);
            });
    });
};


const index_create_user = body => {
    const body_arr = _.values(body).filter((item) => item.trim() !== '');
    if (body_arr.length !== 4) {
        let error = new Error('Fill the form correctly');
        return Promise.reject(error);
    }

    if (body.password !== body.passwordConf) {
        let error = new Error(`Passwords doesn't match`);
        return Promise.reject(error);
    }

    const user = new User({
        email: body.email,
        username: body.username,
        password: body.password
    });

    return new Promise((resolve, reject) => {
        user.save()
            .then((user) => {
                resolve(user);
            })
            .catch(err => {
                let error = new Error('username/email already exist');
                reject(error);
            });
    });
};

module.exports = { index_login_user, index_create_user };