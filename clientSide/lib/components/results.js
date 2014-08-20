var common = require("./common"),
    _ = require("lodash"),
    $ = require("jquery");

exports.show = function (employees) {
  common.hideEverything();

  var $table = $("<table class=\"table table-striped table-hover\"><tr>\n\
              <th>ID</td>\n\
              <th>Birth Date</td>\
              <th>First Name</td>\
              <th>Last Name</td>\
              <th>Sex</td>\
              <th>Start Date</td>\
              </tr></table>");


  _.each(employees, function (employee, id) {
    $table.append("<tr>\n\
                    <td>" + id + "</td>\n\
                    <td>" + employee.birthdate + "</td>\
                    <td>" + employee.firstname + "</td>\
                    <td>" + employee.lastname + "</td>\
                    <td>" + employee.sex + "</td>\
                    <td>" + employee.start_date + "</td>\
                   </tr>");
  });

  $("#results div").html($table);
  $("#results").show();
};
