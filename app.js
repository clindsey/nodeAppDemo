module.exports = function () {
  var  express = require("express"),
       path = require("path"),
       favicon = require("serve-favicon"),
       errorhandler = require("errorhandler"),
       app = express();

  app.set("port", process.env.PORT || 3000);

  // Static Page Templating
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "mustache");
  app.engine("mustache", require("hogan-express"));

  // Middleware
  app.use(favicon(__dirname + "/public/images/favicon.ico"));
  app.use(express.static(path.join(__dirname, "public")));

  if (process.env.NODE_ENV === "development") {
    app.use(errorhandler());
  }

  // create our routes and return the app so that the app
  // can be started in multiple ways (ie. testing)
  require("./routes")(app);
  return app;
};
