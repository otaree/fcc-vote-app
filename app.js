require('./config/config');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

const index = require('./routers/index.js');
const user = require('./routers/user');

// connect with mongoDB
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

// set up session
app.use(session({
    store: new MongoStore({
        mongooseConnection: db,
        ttl: (1 * 60 * 60)
    }),
    secret: 'work hard',
    saveUninitialized: true,
    resave: false,
    cookie: {
        path: "/",
        maxAge: 1800000
    },
    name: "id"
}));

session.Session.prototype.login = function (user, cb) {
    const req = this.req;
    req.session.regenerate(function(err) {
        if (err) {
            cb(err);
        }
    });

    req.session.userInfo = user;
    cb();
}

// view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/', index);
app.use('/user', user);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler 
// define as the last app.use callback
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.render('error', { message: err.message, status: status });
});

module.exports = app;