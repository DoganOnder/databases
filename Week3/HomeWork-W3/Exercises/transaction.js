const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myBank",
});

const exQuery = util.promisify(
  connection.query.bind(connection)
);

async function makeTransaction() {
  connection.connect();

  try {
    await exQuery("SET autocommit = 0");
    await exQuery("START TRANSACTION");
    await exQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`
    );
    await exQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`
    );
    await exQuery(
      `INSERT INTO AccountChanges SET ?`,
      {
        change_number: 1003,
        account_number: 101,
        amount: -1000,
        changed_date: "2020-03-23",
        remark: "Tax Payment",
      }
    );
    await exQuery(
      `INSERT INTO AccountChanges SET ?`,
      {
        change_number: 1004,
        account_number: 102,
        amount: 1000,
        changed_date: "2020-05-15",
        remark: "Utilities Payment",
      }
    );
    await exQuery("COMMIT");
  } catch (error) {
    await exQuery("ROLLBACK"); 
    console.error(error);
    connection.end();
  }

  connection.end();
}

makeTransaction();