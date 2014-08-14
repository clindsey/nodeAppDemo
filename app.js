var express = require("express"),
    http = require("http"),
    path = require("path"),
    debug = require("debug")("nodeAppDemo"),
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

// Start the server and set routes
require("./routes")(app);
http.createServer(app).listen(app.get("port"), function () {
  debug("[info] nodeAppDemo running on port " + app.get("port"));
});

