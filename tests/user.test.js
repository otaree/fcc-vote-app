const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Poll = require('../models/poll');
const User = require('../models/user');
const userController = require('../controllers/user_controller');

const userId = new mongoose.Types.ObjectId();
const userEmail = 'joe@test.com';
const username = 'joe';
const password = 'tester';
const newUser = new User({
    _id: userId,
    email: userEmail,
    username: username,
    password: password
});

before((done) => {
    User.remove({})
        .then(() => {
            return newUser.save()
        }).then(() => done());
});

beforeEach((done) => {
    Poll.remove({})
        .then(() => done());
});




describe('CREATE POLL', function() {
    it('should create new poll', function(done) {
        const name = 'what is your fav band';
        const option1 = 'Metallica';
        const option2 = 'Babymetal';
        const option3 = 'Five Finger Death Punch';

        const newPollBody = { name, option1, option2, option3 };

        userController.user_createPoll(newPollBody, { _id: userId})
            .then((poll) => {
                expect(poll).to.be.an('object');
                expect(poll.question).to.be.equal(name);
                expect(poll.options.length).to.be.equal(3);
                done();
            })
            .catch(done)
    });

    it('should return "Fill the form correctly" error', function(done) {
        const name = 'what is your fav band';
        const option1 = 'Metallica';
        const option2 = '';

        const newPollBody = { name, option1, option2 };

        userController.user_createPoll(newPollBody, { _id: userId})
            .catch(err => {
                try {
                    expect(err.message).to.equal('Fill the form correctly');
                } catch (e) {
                    return done(e);
                }
                done();
            });
        
    });
});