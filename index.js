var express = require("express");
var app = express();
var path = require("path");
// var sql = require("mssql"); // MS Sql Server client

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Node app is working!");
});

// Setting up the database
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

// // Connection string parameters.
// var sqlConfig = {
//     user: "UserName",
//     password: "mot de passe",
//     server: "localhost",
//     database: "DatabaseName",
//   };

// // Start server and listen on http://localhost:8081/
// var server = app.listen(8081, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("app listening at http://%s:%s", host, port);
// });

// app.get("/customers", function (req, res) {
//   sql.connect(sqlConfig, function () {
//     var request = new sql.Request();
//     request.query("select * from Sales.Customer", function (err, recordset) {
//       if (err) console.log(err);
//       res.end(JSON.stringify(recordset)); // Result in JSON format
//     });
//   });
// });
