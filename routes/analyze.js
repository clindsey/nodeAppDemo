/**
 * POST /analyze
 * ------------------
 * params:
 *  employees: an employees csv file that should be of the format "employee_id / birthdate / firstname / lastname / sex / start_date"
 *  salaries: a salaries csv file that should be of the format "employee_id / salary / start_of_salary / end_of_salary"
 *
 * Returns a JSON representation employees and salaries joined.
 *
 * Used https://github.com/substack/stream-handbook as a reference
 */

var Busboy = require("busboy"),
    csv = require("csv"),
    stream = require("stream"),
    debug = require("debug")("nodeAppDemo"),
    employeeDataWriter = require("../lib/employeeDataWriter"),
    salaryDataWriter = require("../lib/salaryDataWriter");


module.exports = function(req, res) {
  var joinedData = {}, employeeWriter, busboy;

  busboy = new Busboy({headers: req.headers});
  employeeWriter = employeeDataWriter(joinedData);
  salaryWriter = salaryDataWriter(joinedData);

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

    var filePipe = file.pipe(csv.parse());

    // The client will always send the employees data first, so we can rely on employees
    // data being ready when we start to parse salaries as they come in.
    if (fieldname === "employees") {
      filePipe.pipe(employeeWriter);
    }
    else if (fieldname === "salaries") {
      filePipe.pipe(salaryWriter);
    }

  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });

  busboy.on('finish', function() {
    debug("[info] Successfully parsed data for client at " + req.ip);
    res.send({success: true, data: joinedData});
  });

  req.pipe(busboy);
};
