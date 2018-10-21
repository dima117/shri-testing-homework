const path = require('path');
const express = require('express');

const PORT = 3000;
const HOST = '::';

// controller
const {Controller} = require('./app/controller/controller');

const app = express();
const controller = new Controller();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hbs');
app.set('view options', {layout: 'layout', extname: '.hbs'});

// static files
app.use(express.static(path.join(__dirname, 'public')));


// pages
app.get('/', (req, res) => controller.indexController(req, res));
app.get('/files/:hash/*?', (req, res, next) => controller.filesController(req, res, next));
app.get('/content/:hash/*?', (req, res, next) => controller.contentController(req, res, next));

// error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    const {status = 500, message} = err;

    // render the error page
    res.status(status);
    res.render('error', {title: 'error', status, message});
});

app.listen(PORT, HOST, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
