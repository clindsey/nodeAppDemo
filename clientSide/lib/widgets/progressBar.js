var common = require("./common"),
    $ = require("jquery");

exports.display = function () {
  common.hideEverything();
  exports.update(0);
  $("#uploadProgress").show();
};

exports.update = function (progress) {
  $("#uploadProgress .progress-bar").css("width", progress + "%");
  $("#uploadProgress .progress-bar").attr("aria-valuenow", progress);
  $("#uploadProgress span").html(progress + "%");
};