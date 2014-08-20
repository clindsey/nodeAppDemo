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

    employees[id].salary = row[1];
    employees[id].start_of_salary = row[2];
    employees[id].end_of_salary = row[3];

    cb(null);
  };

  return writeData;
};