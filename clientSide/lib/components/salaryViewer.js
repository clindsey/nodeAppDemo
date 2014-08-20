var $ = require("jquery"),
    accounting = require("accounting");

function generateTable(salaries) {
  var $table = $("<table class=\"table table-striped table-hover\"><tr>\n\
              <th>Salary</td>\n\
              <th>Start of Salary</td>\
              <th>End of Salary</td>\
              </tr></table>");

  salaries.forEach(function (salary) {
    $table.append("<tr>\n\
                   <td>" + accounting.formatMoney(salary.salary) + "</td>\n\
                   <td>" + salary.start_of_salary + "</td>\n\
                   <td>" + salary.end_of_salary + "</td>\n\
                   </tr>");
  });

  return $table;
}

exports.employeeClickHandler = function (data, event) {
  event.preventDefault();
  var target = $(event.target),
      employee = data.employeeData[target.attr("id")];

  $("#salaryModal .modal-title").html(employee.firstname + " " + employee.lastname);
  $("#salaryModal .modal-body").html(generateTable(employee.salaries));

  // Hack to use Bootstrap's modals...
  window.$("#salaryModal").modal("show");
};
