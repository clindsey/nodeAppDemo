var common = require("./common"),
    _ = require("lodash"),
    $ = require("jquery"),
    accounting = require("accounting");

exports.show = function (data) {
  common.hideEverything();

  var $table = $("<table class=\"table table-striped table-hover\"><tr>\n\
              <th>ID</td>\n\
              <th>Birth Date</td>\
              <th>First Name</td>\
              <th>Last Name</td>\
              <th>Sex</td>\
              <th>Start Date</td>\
              </tr></table>");


  _.each(data.employees, function (employee, id) {
    $table.append("<tr> \
                    <td>" + id + "</td> \
                    <td>" + employee.birthdate + "</td> \
                    <td><a href=\"#\" id=\"" + id + "\">" + employee.firstname + "</a></td> \
                    <td><a href=\"#\" id=\"" + id + "\">" + employee.lastname + "</a></td> \
                    <td>" + employee.sex + "</td> \
                    <td>" + employee.start_date + "</td> \
                   </tr>");
  });

  $("#resultsDataContainer").html($table);

  $("#statsContainer").html("<strong>Success!  Here are some stats...</strong> \
                             <ul>\
                              <li><strong>Total Employees: </strong>" + data.stats.totalEmployees + "</li> \
                              <li><strong>Total Male Employees: </strong>" + data.stats.totalMale + "</li> \
                              <li><strong>Total Female Employees: </strong>" + data.stats.totalFemale + "</li> \
                              <li><strong>Average Salary: </strong>" + accounting.formatMoney(data.stats.averageSalary) + "</li> \
                              <li><strong>Average Male Salary: </strong>" + accounting.formatMoney(data.stats.averageMaleSalary) + "</li> \
                              <li><strong>Average Female Salary: </strong>" + accounting.formatMoney(data.stats.averageFemaleSalary) + "</li> \
                             </ul>");
  $("#results").show();
};
