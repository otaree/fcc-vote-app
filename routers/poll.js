const mongoose = require('mongoose');
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

router.get('/:id', requireLogin,  (req, res) => {
    Poll.findById(req.params.id).populate('author')
        .then(poll => {
            if (poll.voters.indexOf(req.session.userInfo._id) === -1) {
                res.render('poll_vote', {title: 'Poll', poll: poll, user: req.session.userInfo});
            } else {
                res.render('poll', {title: 'Poll', poll: poll, user: req.session.userInfo});
            }
            
        });
});

router.post('/vote/:id', requireLogin, (req, res, next) => {
    if (req.body.id !== undefined) {
        Poll.findOneAndUpdate(
            { 'options._id': mongoose.Types.ObjectId(req.body.id)},
            { 
                "$inc": { "options.$.votes": 1},
                "$push": { "voters": req.session.userInfo._id }
             },
            {new: true}
        ).populate('author').then(poll => {
            res.render('poll', {title: 'Poll', poll: poll, user: req.session.userInfo});
        }).catch(err => next(new Error('Something wrong with the server')));
    } else {
        Poll.findById(req.params.id)
        .then(poll => {
            res.render('poll_vote', {title: 'Poll', poll: poll, user: req.session.userInfo, error: new Error("Please Select a Option")});
        });
    }
});



module.exports = router;