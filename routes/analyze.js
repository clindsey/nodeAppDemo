/**
 * POST /analyze
 * ------------------
 * params:
 *  employees: an employees csv file that should be of the format "employee_id / birthdate / firstname / lastname / sex / start_date"
 *  salaries: a salaries csv file that should be of the format "employee_id / salary / start_of_salary / end_of_salary"
 *
 * Returns a JSON representation employees and salaries joined.
 */

var formidable = require("formidable"),
    debug = require("debug")("nodeAppDemo");

module.exports = function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (error/*, fields, files*/) {
    // TODO! 
    if (error) { throw error; }
    res.send({result: "It works!"});
    debug("[info] Sent results back to user");
  });
};
