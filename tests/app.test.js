var expect = require("expect.js"),
    request = require("supertest"),
    app = require("../app.js")(), fs = require("fs");

it("should be able to correctly join uploaded employee and salary data", function (done) {
  request(app)
          .post("/analyze")
          .attach("employees", __dirname + "/fixtures/employees_small.csv")
          .attach("salaries", __dirname + "/fixtures/salaries_small.csv")
          .expect(200)
          .end(function (error, response) {
            if (error) { throw error; }

            fs.writeFileSync("smallJoin.json", response.text);
            expect(response.text).to.be(fs.readFileSync(__dirname + "/fixtures/smallJoin.json",
                                        {encoding: "utf8"}));
            done();
          });
});

it("should give the correct error if just /analyze is called", function (done) {
  request(app)
          .post("/analyze")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be("{\"success\":false,\"error\":\"Missing Content-Type\"}");
            done();
          });
});

it("should give the correct error if salaries data is missing", function (done) {
  request(app)
          .post("/analyze")
          .attach("employees", __dirname + "/fixtures/employees_small.csv")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be("{\"success\":false,\"error\":\"Missing either salaries or employees data\"}");
            done();
          });
});

it("should give the correct error if employees data is missing", function (done) {
  request(app)
          .post("/analyze")
          .attach("salaries", __dirname + "/fixtures/salaries_small.csv")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be("{\"success\":false,\"error\":\"Got invalid data\"}");
            done();
          });
});

it("should give the correct error if invalid csv files are given for both salaries and employees", function (done) {
  request(app)
          .post("/analyze")
          .attach("employees", __dirname + "/fixtures/employees_small_invalid.csv")
          .attach("salaries", __dirname + "/fixtures/salaries_small_invalid.csv")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be('{"success":false,"error":"Invalid employee row: [\\"86679\\",\\"1964-07-09\\",\\"Chaitali\\",\\"Gargeya\\"]"}'); // jshint ignore:line
            done();
          });
});

it("should give the correct error if invalid csv is given just for salaries", function (done) {
  request(app)
          .post("/analyze")
          .attach("employees", __dirname + "/fixtures/employees_small.csv")
          .attach("salaries", __dirname + "/fixtures/salaries_small_invalid.csv")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be('{"success":false,"error":"Invalid salaries row: [\\"67494\\",\\"1999-04-23\\",\\"2000-04-22\\"]"}'); // jshint ignore:line
            done();
          });
});

it("should give the correct error if invalid files are uploaded", function (done) {
  request(app)
          .post("/analyze")
          .attach("bad", __dirname + "/fixtures/employees_small.csv")
          .attach("bad1", __dirname + "/fixtures/salaries_small_invalid.csv")
          .attach("bad2", __dirname + "/fixtures/employees_small.csv")
          .attach("bad3", __dirname + "/fixtures/salaries_small_invalid.csv")
          .expect(400)
          .end(function (error, response) {
            if (error) { throw error; }

            expect(response.text).to.be('{"success":false,"error":"Got invalid data"}'); // jshint ignore:line
            done();
          });
});