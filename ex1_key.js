var mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "userdb",
});

const queryAsk = util.promisify(connection.query.bind(connection));

async function dataFactory() {
	const authorFactory = `CREATE TABLE authors(
    author_no int PRIMARY KEY,
    author_name text, 
    university text,
    date_of_birth date, 
    h_index int, 
    gender text)`;

	const fk_Collaborator_Add = `ALTER TABLE authors 
    ADD collaborator INT, 
    ADD CONSTRAINT 
    fk_Collaborator_Add 
    FOREIGN KEY (collaborator) 
    REFERENCES authors(author_no)`;

	connection.connect();

	try {
		await Promise.all[
			(queryAsk("DROP DATABASE IF EXISTS library"), queryAsk("CREATE DATABASE library"))
		];

		await Promise.all[
			(queryAsk("USE library"), (queryAsk(authorFactory), queryAsk(fk_Collaborator_Add)))
		];
	} catch (error) {
		console.error(error);
	}

	connection.end();
}

dataFactory();