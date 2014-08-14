/*
 * GET /
 * ---------------------
 * Main entry point page.
 */
exports.index = function (req, res) {
  res.render("index", {
    title: "nodeAppDemo",
    layout: "layout"
  });
};