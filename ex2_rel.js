var mysql = require("mysql");
const authors = require("./authors");
const papers = require("./papers");
const util = require("util");
const collaborators = require("./coll-data");
const relation_data = require("./relation_table_data");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "library",
});

const queryAsk = util.promisify(connection.query.bind(connection));

async function dataFactory() {
	const paperFactory = `CREATE TABLE 
    IF NOT EXISTS 
    Research_Papers (
    paper_id INT PRIMARY KEY, 
    paper_title TEXT, 
    conference TEXT, 
    publish_date DATE)`;

	const relationFactory = `CREATE TABLE 
    IF NOT EXISTS 
    Relation_Table (
    author_id INT, 
    paper_id INT, 
    CONSTRAINT FK_Author 
    FOREIGN KEY(author_id) 
    REFERENCES authors(author_no), 
    CONSTRAINT FK_Paper 
    FOREIGN KEY(paper_id) 
    REFERENCES Research_Papers(paper_id), 
    CONSTRAINT PK_Author_Paper 
    PRIMARY KEY(author_id, paper_id))`;

	function collab_number() {
		return 101 + Math.floor(Math.random() * collaborators.length);
	}

	connection.connect();

	try {
		await queryAsk(paperFactory);
		await queryAsk(relationFactory);

		authors.forEach(async author => {
			await queryAsk("INSERT INTO authors SET ?", author);
		});

		papers.forEach(async paper => {
			await queryAsk("INSERT INTO Research_Papers SET ?", paper);
		});

		relation_data.forEach(async data => {
			await queryAsk("INSERT INTO Relation_Table SET ?", data);
		});

		collaborators.map(async value => {
			await queryAsk(
				`UPDATE Authors SET collaborator = ${collab_number()} WHERE author_no = ${value}`
			);
		});
	} catch (error) {
		console.error(error);
		connection.end();
	} finally {
		connection.end();
	}
}

dataFactory();