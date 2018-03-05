const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');

describe('GET /', function() {
    it("should return 202 status code", function(done) {
        request(app)
            .get('/')
            .expect(202)
            .end(done);
    });
});

describe('GET /login', function() {
    it("should return 202 status code", function(done) {
        request(app)
            .get('/login')
            .expect(202)
            .end(done);
    });
});

describe('GET /signup', function () {
    it("should return 2020 status code", function (done) {
        request(app)
            .get('/signup')
            .expect(202)
            .end(done);
    });
});