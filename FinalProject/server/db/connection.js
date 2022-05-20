const mysql = require("mysql");
require("dotenv").config();

//Create MySQL pool
const connection_pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

module.exports = connection_pool;
