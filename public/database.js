const mysql= require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  database: "newDB",
  user: "root",
  password: "vijayasri" });


module.exports=connection;
