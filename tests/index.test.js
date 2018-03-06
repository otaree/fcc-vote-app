const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const User = require('../models/user');
const indexControllers = require('../controllers/index_controller'); 

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const users = [{
        _id: userOneId,
        email: 'test1@test.com',
        username: 'test1',
        password: 'tester'
    },
    {
        _id: userTwoId,
        email: 'test2@test.com',
        username: 'test2',
        password: 'tester'
    }
];

beforeEach((done) => {
    User.remove({})
        .then(() => {
           return User.insertMany(users);
        })
        .then(() => done());
});

describe('CREATE User', function () {
    it('should create new User', function (done) {
        setTimeout(done, 5000);
        const email = 'joe@test.com';
        const username = 'joe';
        const password = 'tester';
        const passwordConf = 'tester';
        const body =  { email, username, password, passwordConf };

        indexControllers.index_create_user(body)
            .then(user => {
                expect(user).to.be.an('object');
                expect(user).to.include({ email, username });
                expect(user.password).to.not.equal(password);
                done();
            })
            .catch(err => done(err));
    });

    it('should return "Fill form correctly" error', function (done) {
        const email = 'joe@test.com';
        const username = 'joe';
        const password = 'tester';
        const body =  { email, username, password };

        indexControllers.index_create_user(body)
            .catch(err => {
                try {
                    expect(err.message).to.equal('Fill the form correctly');
                } catch (e) {
                    return done(e);
                }
                done();
            });
    });

    it('should return "Passwords doesn\'t match" error', function(done) {
        const email = 'joe@test.com';
        const username = 'joe';
        const password = 'tester';
        const passwordConf = 'tester1';
        const body =  { email, username, password, passwordConf };

        indexControllers.index_create_user(body)
            .catch(err => {
                try {
                    expect(err.message).to.equal('Passwords doesn\'t match');
                } catch (e) {
                    return done(e);
                }
                done();
            });
    });

    it('should return "username/email already exist" error', function (done) {
        setTimeout(done, 5000);
        const email = users[0].email;
        const username = users[0].username;
        const password = 'tester';
        const passwordConf = 'tester';

        const body =  { email, username, password, passwordConf };

        indexControllers.index_create_user(body)
            .catch(err => {
                try {
                    expect(err.message).to.equal('username/email already exist');
                } catch (e) {
                    return done(e);
                }
                done();
            });
    });
});