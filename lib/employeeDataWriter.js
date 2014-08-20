var Writable = require("stream").Writable;

module.exports = function (employees) {
  var writeData = new Writable({objectMode: true});

  writeData._write = function(row, encoding, cb) {
    if (row.length !== 6) {
      return cb(new Error("Invalid employee row: " + JSON.stringify(row)));
    }

    employees[row[0]] = {
      birthdate: row[1],
      firstname: row[2],
      lastname: row[3],
      sex: row[4],
      start_date: row[5],
      salaries: []
    };

    cb(null);
  };

  return writeData;
};