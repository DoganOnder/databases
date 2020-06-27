var mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "library",
});

const queryAsk = util.promisify(
  connection.query.bind(connection)
);

async function dataFactory() {
  //Write a query that prints names of all Authors and their corresponding Collaborators.
  const aut_collab =
    "SELECT A1.Author_name, A2.author_name as Collaborator from authors as A1 INNER JOIN authors as A2 ON A1.collaborator = A2.author_no;";

  const published_papers =
    "SELECT A.Author_name, P.paper_title AS Paper_Title from authors AS A INNER JOIN relation_table as R ON A.author_no=R.author_id INNER JOIN Research_Papers AS P ON R.paper_id=P.paper_id;";

  connection.connect();

  try {
    await connection.query(
      aut_collab,
      function (error, results, fields) {
        if (error) throw error;
        Object.keys(results).forEach((key) => {
          var row = results[key];
          console.log(
            row.Author_name,
            row.Collaborator
          );
        });
       
      }
    );

    await connection.query(
      published_papers,
      function (error, results, fields) {
        if (error) throw error;
        Object.keys(results).forEach((key) => {
          var row = results[key];
          console.log(
            row.Author_name,
            row.Paper_Title
          );
        });
      }
    );
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}
dataFactory();