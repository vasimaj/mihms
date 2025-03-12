const mysql = require("mysql");

// Database configuration

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mihotelexpress",
});

// Connect to the database

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

module.exports = con;
