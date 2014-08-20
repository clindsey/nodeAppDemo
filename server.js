var app = require("./app.js")();

http.createServer(app).listen(app.get("port"), function() {
  debug("[info] nodeAppDemo running on port " + app.get("port"));
});