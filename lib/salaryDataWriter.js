var Writable = require("stream").Writable;

module.exports = function (employees) {
  var writeData = new Writable({objectMode: true});

  writeData._write = function(row, encoding, cb) {
    if (row.length !== 4) {
      return cb(new Error("Invalid salaries row: " + JSON.stringify(row)));
    }

    var id = row[0];

    if (!employees[id]) {
      console.log("Non-existent employee: " + id);
    }

    employees[id].salaries.push({
      salary: row[1],
      start_of_salary: row[2],
      end_of_salary: row[3]
    });

    if (employees[id].salaries.length > 1) {
      console.log("Employee " + id + " has more than one salary history!");
    }

    cb(null);
  };

  return writeData;
};