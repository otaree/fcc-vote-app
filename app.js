const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

const index = require('./routers/index.js');

// view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(logger('dev'));

app.use('/', index);


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