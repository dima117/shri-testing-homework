const path = require('path');
const express = require('express');
const { contentController } = require('./controllers/contentController');
const { filesController } = require('./controllers/filesController');
const { indexController } = require('./controllers/indexController');

const PORT = 3000;
const HOST = '::';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout', extname: '.hbs' });

// static files
app.use(express.static(path.join(__dirname, 'public')));

// pages
app.get('/', (req, res, next) => {
    const controller = new indexController(req, res, next);
    controller.render(0, 20);
});
app.get('/files/:hash/*?', (req, res, next) => {
    const controller = new filesController(req, res, next);
    controller.render();
});
app.get('/content/:hash/*?', (req, res, next) => {
    const controller = new contentController(req, res, next);
    controller.render();
});

// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    const { status = 500, message } = err;

    // render the error page
    res.status(status);
    res.render('error', { title: 'error', status, message });
});

app.listen(PORT, HOST, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
