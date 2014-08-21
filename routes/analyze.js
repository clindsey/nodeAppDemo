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
    debug = require("debug")("nodeAppDemo"),
    employeeDataWriter = require("../lib/employeeDataWriter"),
    salaryDataWriter = require("../lib/salaryDataWriter");

function logAndSendError(error, req, res) {
  debug("[error] " + req.ip + " had the following error: ");
  debug(error.stack);

  res.status(400);
  res.send({success: false, error: error.message});
}


module.exports = function (req, res) {
  var joinedData = {}, employeeWriter, salaryWriter, busboy, error = null,
      gotEmployees = false, gotSalaries = false, busboyOptions, stats = {};

  busboyOptions = {
    headers: req.headers,
    limits: {
      files: 2
    }
  };

  try {
    busboy = new Busboy(busboyOptions);
  } catch (ex) {
    return logAndSendError(ex, req, res);
  }

  employeeWriter = employeeDataWriter(joinedData, stats);
  salaryWriter = salaryDataWriter(joinedData, stats);

  busboy.on("file", function (fieldname, file) {
    // The client will always send the employees data first, so we can rely on employees
    // data being ready when we start to parse salaries as they come in.
    if (fieldname === "employees") {
      gotEmployees = true;

      file.pipe(csv.parse())
          .on("error", function (err) { error = err; })
          .pipe(employeeWriter)
          .on("error", function (err) { error = err; });
    }
    else if (fieldname === "salaries" && gotEmployees) {
      // If there has been an error, we don't want to do
      // any more parsing.
      if (error) { return file.resume(); }
      gotSalaries = true;

      file.pipe(csv.parse())
          .on("error", function (err) { error = err; })
          .pipe(salaryWriter)
          .on("error", function (err) { error = err; });
    }
    else {
      error = new Error("Got invalid data");
      file.resume();
    }
  });

  busboy.on("filesLimit", function () {
    debug("[error] " + req.ip + " tried to send more than two files!");
  });

  busboy.on("finish", function () {
    var responseData;

    if (error) {
      logAndSendError(error, req, res);
    }
    else if (!gotSalaries || !gotEmployees) {
      error = new Error("Missing either salaries or employees data");
      logAndSendError(error, req, res);
    }
    else {
      debug("[info] Successfully parsed data for client at " + req.ip);

      responseData = {
        success: true,
        employees: joinedData,
        stats: {
          averageSalary: stats.totalSalary / (stats.totalMaleSalaries + stats.totalFemaleSalaries),
          averageMaleSalary: stats.totalMaleSalary / stats.totalMaleSalaries,
          averageFemaleSalary: stats.totalFemaleSalary / stats.totalFemaleSalaries,
          totalEmployees: stats.totalEmployees,
          totalFemale: stats.totalFemale,
          totalMale: stats.totalMale
        }
      };

      res.send(responseData);
    }
  });

  busboy.on("error", function (error) {
    console.log("Error logged:");
    logAndSendError(error, req, res);
  });

  req.pipe(busboy);
};
