const path = require('path');
const express = require('express');

const PORT = 3000;
const HOST = '::';

// controllers
const indexController = require('./controllers/indexController');
const filesController = require('./controllers/filesController');
const contentController = require('./controllers/contentController');
const { executeGit } = require('./utils/git');

const fakeREPO = path.resolve('./tests/hermioneStub/');
const app = express();

if (process.env.NODE_ENV === 'testing') {
  executeGit._fakeREPO = fakeREPO;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout', extname: '.hbs' });

// static files
app.use(express.static(path.join(__dirname, 'public')));

// pages
app.get('/', indexController);
app.get('/files/:hash/*?', filesController);
app.get('/content/:hash/*?', contentController);

// error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message } = err;

  // render the error page
  res.status(status);
  res.render('error', { title: 'error', status, message });
});

app.listen(PORT, HOST, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
