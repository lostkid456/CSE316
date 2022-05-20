This project uses MySQL as the database. Before running the project, the following should be done:

1. Create the database 'fake_so' in MySQL
2. Cd into the server directory
3. Run the 'envsetup.js' script to create the .env file. To run the script: node envsetup.js 'db_username' 'db_password' 'secret_keyword'
4. Staying in the same server directory, run the 'setup.js' script to initalize the MySQL database. To run the script: node setup.js
5. Then run npm start on the client dir and run the server as you would normally
6. Includes : react-router-dom,react-router libaries
7. For sign up, the password must be a secure password which means it includes at least 1 captial, 1 digit and 1 special character.
