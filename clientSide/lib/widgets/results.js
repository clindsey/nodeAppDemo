var common = require("./common"),
    $ = require("jquery");

exports.show = function (data) {
  common.hideEverything();

  $("#results p").html(JSON.stringify(data));
  $("#results").show();
};
