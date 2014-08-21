var Writable = require("stream").Writable;

module.exports = function (employees, stats) {
  var writeData = new Writable({objectMode: true});

  stats.totalSalary = 0;
  stats.totalMaleSalary = 0;
  stats.totalFemaleSalary = 0;
  stats.totalMaleSalaries = 0;
  stats.totalFemaleSalaries = 0;

  writeData._write = function(row, encoding, cb) {
    var salary;

    if (row.length !== 4) {
      return cb(new Error("Invalid salaries row: " + JSON.stringify(row)));
    }

    var id = row[0];

    if (!employees[id]) {
      return cb(new Error("Non-existent employee: " + id));
    }

    // Handle Stats
    salary = parseInt(row[1], 10);
    stats.totalSalary += salary;

    if (employees[id].sex === "M") {
      stats.totalMaleSalary += salary;
      stats.totalMaleSalaries += 1;
    }
    else if (employees[id].sex === "F") {
      stats.totalFemaleSalary += salary;
      stats.totalFemaleSalaries += 1;
    }

    employees[id].salaries.push({
      salary: salary,
      start_of_salary: row[2],
      end_of_salary: row[3]
    });

    cb(null);
  };

  return writeData;
};