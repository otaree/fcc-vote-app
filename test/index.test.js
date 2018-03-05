const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const User = require('../models/user');

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
            User.insertMany(users)
        })
        .then(() => done());
});

describe('GET /', function () {
    it("should return 202 status code", function (done) {
        request(app)
            .get('/')
            .expect(202)
            .end(done);
    });
});

describe('GET /login', function () {
    it("should return 202 status code", function (done) {
        request(app)
            .get('/login')
            .expect(202)
            .end(done);
    });
});

describe('GET /signup', function () {
    it("should return 202 status code", function (done) {
        request(app)
            .get('/signup')
            .expect(202)
            .end(done);
    });
});

describe('POST /login', function () {
    it("should login a user", function (done) {
        request(app)
            .post('/login')
            .send({ email: users[0].email, password: users[0].password})
            .expect(302)
            .end(done);
    });
});