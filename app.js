const path = require('path');
const express = require('express');

const PORT = 3000;
const HOST = '::';

// Init controllers
const indexController = require('./controllers/indexController');
const filesController = require('./controllers/filesController');
const contentController = require('./controllers/contentController');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout', extname: '.hbs' });

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Pages
app.get('/', indexController);
app.get('/files/:hash/*?', filesController);
app.get('/content/:hash/*?', contentController);

// Error handlers
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use(function(err, req, res, next) {
	const { status = 500, message } = err;

	// Render the error page
	res.status(status);
	res.render('error', { title: 'error', status, message });
});

app.listen(PORT, HOST, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
