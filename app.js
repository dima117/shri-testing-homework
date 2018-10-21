const path = require('path');
const express = require('express');

const PORT = 3000;
const HOST = '::';

const app = express();

// controllers
const controllers = require('./controllers')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout', extname: '.hbs' });

// static files
app.use(express.static(path.join(__dirname, 'public')));

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  const { status = 500, message } = err;

  res.status(status);
  res.render('error', { title: 'error', status, message });
});

app.listen(PORT, HOST, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
