var Writable = require("stream").Writable;

module.exports = function (employees, stats) {
  var writeData = new Writable({objectMode: true});

  stats.totalEmployees = 0;
  stats.totalFemale = 0;
  stats.totalMale = 0;

  writeData._write = function(row, encoding, cb) {
    var newEmployee;

    if (row.length !== 6) {
      return cb(new Error("Invalid employee row: " + JSON.stringify(row)));
    }

    newEmployee = {
      birthdate: row[1],
      firstname: row[2],
      lastname: row[3],
      sex: row[4],
      start_date: row[5],
      salaries: []
    };

    if (newEmployee.sex === "M") { stats.totalMale += 1 }
    else if (newEmployee.sex === "F") { stats.totalFemale += 1 }

    stats.totalEmployees += 1;
    employees[row[0]] = newEmployee;
    cb(null);
  };

  return writeData;
};