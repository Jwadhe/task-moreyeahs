require ('dotenv').config();
var mysql = require('mysql');
const mongoose = require('mongoose');

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => {
     console.log('Database connected.')
  }).catch((err) => {
     console.log(`Connection failed ${err}`)
 })


module.exports = mongoose;



// var Mysqlconnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "employeedb",
//   multipleStatements: true
// });

// Mysqlconnection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// module.exports = Mysqlconnection;