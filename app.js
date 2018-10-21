const path = require("path");
const express = require("express");

const PORT = 3000;
const HOST = "::";

// controllers
const { IndexController } = require("./controllers/IndexController");
const { FilesController } = require("./controllers/FilesController");
const { ContentController } = require("./controllers/ContentController");
const indexController = new IndexController();
const filesController = new FilesController();
const contentController = new ContentController();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "layout", extname: ".hbs" });

// static files
app.use(express.static(path.join(__dirname, "public")));

// pages
app.get("/", (...args) => {
  indexController.render(...args);
});
app.get("/files/:hash/*?", (...args) => {
  filesController.render(...args);
});
app.get("/content/:hash/*?", (...args) => {
  contentController.render(...args);
});

// error handlers
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  const { status = 500, message } = err;

  // render the error page
  res.status(status);
  res.render("error", { title: "error", status, message });
});

app.listen(PORT, HOST, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = app;
