// Application server

// Imports Express module
const express = require("express");

const cookie_parser = require("cookie-parser");

require("dotenv").config();

// Session
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const options = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

// Create the server and set port 8000
const app = express();
const port = 8000;

// cors middleware
var cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/"],
    credentials: true,
  })
);

// Other required middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie_parser());

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// React router middleware
app.use(require("./routes/route"));

// Run the server on port 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
