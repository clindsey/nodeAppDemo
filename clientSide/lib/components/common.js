var $ = require("jquery");

exports.hideEverything = function () {
  $("#uploadForm").hide();
  $("#uploadProgress").hide();
  $("#results").hide();
};