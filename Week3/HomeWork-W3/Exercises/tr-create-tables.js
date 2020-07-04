const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const exQuery = util.promisify(
  connection.query.bind(connection)
);

connection.connect();

async function dbAndTableFactory() {
  const dropDatabaseMyBank =
    "DROP DATABASE IF EXISTS MyBank;";
  const createDatabaseMyBank =
    "CREATE DATABASE myBank;";
  const useDatabaseMybank = "USE myBank;";

  const createTableAccount =
    "CREATE TABLE Account (account_number INT PRIMARY KEY, balance FLOAT);";

  const createTableAccountChanges = `CREATE TABLE AccountChanges 
    (change_number INT PRIMARY KEY,
    account_number INT,
    amount INT,
    changed_date TIMESTAMP,
    remark VARCHAR(50),
    CONSTRAINT FK_Account FOREIGN KEY(account_number) REFERENCES account(account_number) );`;

  try {
    await exQuery(dropDatabaseMyBank);
    await exQuery(createDatabaseMyBank);
    await exQuery(useDatabaseMybank);
    await exQuery(createTableAccount);
    await exQuery(createTableAccountChanges);
  } catch (error) {
    console.error(error);

    connection.end();
  }
  connection.end();
}

dbAndTableFactory();