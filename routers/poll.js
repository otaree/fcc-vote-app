const express = require('express');
const router = express.Router();

const Poll = require('../models/poll');
const requireLogin = require('../utils/authenticate');

router.get('/all', (req, res, next) => {
    Poll.find({})
        .then(polls => {
            if (polls.length > 0) {
                res.render('list_polls', {title: 'Polls', polls: polls, user: req.session.userInfo});
            } else {
                res.render('list_polls', {title: 'Polls', user: req.session.userInfo});
            }

        }).catch(next);
});

router.get('/:id',  (req, res) => {
    Poll.findById(req.params.id)
        .then(poll => {
            res.render('poll', {title: 'Poll', poll: poll, user: req.session.userInfo});
        });
});

router.post('/:id', (req, res) => {});



module.exports = router;