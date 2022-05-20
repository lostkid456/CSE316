const fs = require("fs");

let userArgs = process.argv.slice(2);

let user = userArgs[0];
let pass = userArgs[1];
let secret = userArgs[2];

const content =
  "DB_USER = " +
  user +
  "\nDB_PASS = " +
  pass +
  "\nDATABASE = fake_so\nSECRET = " +
  secret;

fs.writeFile(".env", content, (err) => {
  if (err) throw err;
});
