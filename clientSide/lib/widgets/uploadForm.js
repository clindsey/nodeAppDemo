var common = require("./common"),
    $ = require("jquery");

exports.show = function () {
  common.hideEverything();
  $("#uploadForm").show();
};

exports.showError = function (error) {
  $("#error").html("<div class=\"alert alert-danger\" role=\"alert\"><strong>Uh-Oh! </strong>" + error + "</div>");
  exports.show();
};

exports.reset = function () {
  $("#error").hide();
  $("#uploadForm form")[0].reset();
};