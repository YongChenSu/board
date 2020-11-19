var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "yong",
  password: "yong",
  database: "app",
});

module.exports = connection;
