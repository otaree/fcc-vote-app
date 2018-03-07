const express = require('express');
const _ = require('lodash');
const router = express.Router();

const User = require('../models/user');
const requireLogin = require('../utils/authenticate');

router.get('/settings', requireLogin,(req, res) => {
    res.render('setting', {title: 'Setting'});
});

router.post('/settings', requireLogin, async(req, res, next) => {
    const body = _.pick(req.body, ["password", "newPassword"]);

    const body_arr = _.values(body).filter((item) => item.trim() !== '');
    
    if (body_arr.length !== 2) {
        return res.render('setting', {title: 'Setting', error: new Error('Fill the form correctly')});
    }

    try {   
        var updatedUser = await User.findAndUpdatePassword(req.session.userInfo._id, body.newPassword);
    } catch (e) {
        next(new Error('Something went wrong with the server. Try again later'));
    }
    

    res.render('setting', {title: 'success', success: { message: 'Password Changed' }});

});

router.get('/logout', requireLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            next(err);
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;