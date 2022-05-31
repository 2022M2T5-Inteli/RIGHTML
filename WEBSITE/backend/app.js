// CÓDIGO DO SERVIDOR

// importa bibliotecas necessárias
const express = require('express'); 
const sqlite3 = require('sqlite3').verbose();

// cria servidor no endereço local e determina que a pasta frontend deve ser usada como source
const app = express();
const hostname = '127.0.0.1';
const port = 3001;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("../frontend/"));

app.use(express.json());

// caminho do banco de dados
const DBPATH = 'db.db'


/* DEFINIÇÃO DOS ENDPOINTS */

// NETWORK - ler
app.get('/networks', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH); 
  var sql = 'SELECT * FROM network ORDER BY name COLLATE NOCASE'; // ordena por name
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// NETWORK - inserir/criar
app.post('/networkinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	// insere valores de nome e tipo segundo a request enviada pelo cliente
	sql = "INSERT INTO network (name, type) VALUES ('" + req.body.name + "', '" + req.body.type + "')";
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

// NETWORK - deletar
app.post('/networkdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	// deleta segundo o id
	sql = "DELETE FROM network WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

// NETWORK - update
app.post('/networkupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	// permite alterar o nome e o tipo dado certo id (chave primária)
	sql = "UPDATE network SET name = '" + req.body.name + "', type = '" + req.body.type + "' WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});


// NETWORK MANAGER
// NETWORK MANAGER - ler
app.get('/networkmanagers', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM network_manager ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
   
// NETWORK MANAGER - inserir/criar
app.post('/networkmanagerinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "INSERT INTO network_manager (cpf, email, name, network_id) VALUES ('" + req.body.cpf + "', '" + req.body.email + "', '" + req.body.name + "','" + req.body.network_id + "')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); 
	res.end();
});

// NETWORK MANAGER - deletar
app.post('/networkmanagerdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM network_manager WHERE cpf = " + req.body.cpf;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/networkmanagerupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "UPDATE network_manager SET network_id = '" + req.body.network_id + "', email = '" + req.body.email + "', name = '" + 
	req.body.name + "' WHERE cpf = '" + req.body.cpf + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); 
	res.end();
});

/* school */
app.get('/schools', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM school ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.post('/schoolinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO school (name, cnpj, number_of_students, number_of_employees, type_of_institution, school_census_id, network_id) VALUES ('" + 
	req.body.name + "', '" + req.body.cnpj + "', '" + req.body.number_of_students + "', '" + req.body.number_of_employees +
	"', '" + req.body.type_of_institution +"', '" + req.body.school_census_id +"','" + req.body.network_id +"')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

app.post('/schooldelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM school WHERE cnpj = " + req.body.cnpj;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});

app.post('/schoolupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "UPDATE school SET name = '" + req.body.name + "', number_of_students = '" + req.body.number_of_students + 
	"', number_of_employees = '" + req.body.number_of_employees + "', type_of_institution = '" + req.body.type_of_institution +
	"', school_census_id = '" + req.body.school_census_id + "', network_id = '" + req.body.network_id +
	"' WHERE cnpj = '" + req.body.cnpj + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});

// SCHOOL MANAGER
// ler
app.get('/schoolmanagers', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM school_manager ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.post('/schoolmanagerinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO school_manager (name, cpf, email, school_cnpj) VALUES ('" + req.body.name + "', '" + req.body.cpf + 
	"', '" + req.body.email + "', '" + req.body.school_cnpj + "')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

app.post('/schoolmanagerdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM school_manager WHERE cpf = " + req.body.cpf;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});

app.post('/schoolmanagerupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "UPDATE school SET name = '" + req.body.name + "', email = '" + req.body.email + 
	"', network_id = '" + req.body.network_id + "' WHERE cpf = '" + req.body.cpf + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close();
});


app.get('/addresses', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH); 
  var sql = 'SELECT * FROM diagnosis ORDER BY cep COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close();
});

 app.post('/addressinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	sql = "INSERT INTO address (street, street_number, neighborhood, cep, city, state, school_cnpj) VALUES ('" 
	+ req.body.street + "', '" + req.body.street_number + "', '" + req.body.neighborhood + 
	+ req.body.cep + "', '" + req.body.city + "', '" + req.body.state +
	+ req.body.school_cnpj + "')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); 
	res.end();
});

app.post('/addressdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM address WHERE school_cnpj = " + req.body.school_cnpj;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/addressupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "UPDATE school SET street = '" + req.body.street + "', street_number = '" + req.body.street_number + 
	"', neighborhood = '" + req.body.neighborhood + "', cep = '" + req.body.cep +
	"', city = '" + req.body.city + "', state = '" + req.body.state + 
	"' WHERE school_cnpj = '" + req.body.school_cnpj + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

/* DIAGNOSIS */
app.get('/diagnoses', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH); 
  var sql = 'SELECT * FROM diagnosis ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close();
});

 app.post('/diagnosisinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	sql = "INSERT INTO diagnosis (name, description, answer_time) VALUES ('" + req.body.name + "', '" + req.body.description + "', '" + req.body.answer_time + "')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); 
	res.end();
});

app.post('/diagnosisdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM diagnosis WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/diagnosisupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "UPDATE diagnosis SET name = '" + req.body.name + "', description = '" + req.body.description + 
	"', answer_time = '" + req.body.answer_time + "' WHERE id = '" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.get('/axis', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM axis ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/axisinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO axis (name, subdivision_name, position, diagnosis_id) VALUES ('" + req.body.name + "', '" + req.body.subdivision_name + "', '" + req.body.position +"' , '" + req.body.diagnosis_id + "' )" ;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/axisdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM axis WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/axisupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE axis SET name = '" + req.body.name + "', subdivision_name = '" + req.body.subdivision_name + 
	"', position = '" + req.body.position + "', diagnosis_id = '" + req.body.diagnosis_id + "' WHERE id = '" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

app.get('/axissubdivisions', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM axis_subdivision ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/axissubdivisioninsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO axis_subdivision (name, axis_id, diagnosis_id) VALUES ('" + req.body.name + "', '" + req.body.axis_id +
	"', '" + req.body.diagnosis_id + "' )" ;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/axissubdivisiondelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM axis_subdivision WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/axissubdivisionupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE axis_subdivision SET name = '" + req.body.name + "', axis_id = '" + req.body.axis_id + 
	"', diagnosis_id = '" + req.body.diagnosis_id + "' WHERE id = '" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

/* question */
app.get('/questions', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM question ORDER BY position COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

 app.post('/questioninsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO question (text, weight, position, axis_subdivision_id, axis_id, diagnosis_id) VALUES ( '" 
	+ req.body.text + "', '" + req.body.weight + "' , '" + req.body.position + "' , '" + req.body.axis_subdivision_id +
	"' , '" + req.body.axis_id + "' , '" + req.body.diagnosis_id + "')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/questiondelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM question WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/questionupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE question SET text = '" + req.body.text + "', weight = '" + req.body.weight + 
	"', position = '" + req.body.position + "', axis_subdivision_id = '" + req.body.axis_subdivision_id + 
	"', axis_id = '" + req.body.axis_id + "', diagnosis_id = '" + req.body.diagnosis_id +
	"' WHERE id = '" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

app.get('/options', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM option ORDER BY id COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/optioninsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO option (text, weight, position, question_id, axis_subdivision_id, axis_id, diagnosis_id) VALUES ('" +
	req.body.text + "', '" + req.body.weight + "', '" + req.body.position + "', '" + req.body.question_id + "', '" + 
	req.body.axis_subdivision_id + "', '" + req.body.axis_id + "', '" + req.body.diagnosis_id + "' )"  ;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/optiondelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM option WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/optionupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE option SET text = '" + req.body.text + "', weight = '" + req.body.weight + 
	"', position = '" + req.body.position + "', question_id =" + req.body.question_id + 
	"', axis_subdivision_id = '" + req.body.axis_subdivision_id + "', axis_id = '" + 
	req.body.axis_id + "', diagnosis_id = '" + req.body.diagnosis_id + "' WHERE id = '" + 
	req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

app.get('/answers', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM answer ORDER BY id COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/answerinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO answer (extra_info, option_id, question_id, axis_subdivision_id, axis_id, diagnosis_id, school_cnpj,
		school_number_of_students, network_id) VALUES ('"` + req.body.extra_info + "', '" + req.body.option_id + "', '" + req.body.question_id + "', '" + 
		"', '" + req.body.axis_subdivision_id + "', '" + req.body.axis_id + "', '" + req.body.diagnosis_id +
		req.body.school_cnpj +"', '" + "0" + "', '" + req.body.network_id + "')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/answerdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM answer WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/answerupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE answer SET extra_info = '" + req.body.extra_info + "', option_id = '" + req.body.option_id + 
	"', question_id = '" + req.body.question_id + "', axis_subdivision_id =" + req.body.axis_subdivision_id + 
	"', axis_id = '" + req.body.axis_id + "', diagnosis_id = '" + req.body.diagnosis_id + "', school_cnpj = '" + 
	req.body.school_cnpj + "' network_id = '" + req.body.network_id + "' WHERE id = '" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

/* employee */
app.get('/employees', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM employee ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/employeeinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO employee (email, cpf, name, type) VALUES ('" + req.body.email + "', '" + req.body.cpf + "', '" + req.body.type + "', '" + req.body.number_of_employees +"', '" + req.body.type_of_institution +"', '" + req.body.school_census_id +"','" + req.body.network_id +"')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});

	if (req.body.cnpj_school != null) {
		sql = "INSERT INTO employee_school (cnpj_school, email_employee) VALUES ('" + 
		req.body.cnpj_school + "', '" + req.body.email + "')";	
		db.run(sql, [],  err => {
			if (err) {
				throw err;
			}
		});
	}

	db.close();

	res.end();
});

app.post('/employeedelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "DELETE FROM employee WHERE email = " + req.body.email;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.post('/employeeupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE employee SET name = '" + req.body.name + "', type = '" + req.body.type + 
	"', cpf = '" + req.body.cpf + "' WHERE email = '" + req.body.email + "'";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); 
});

/* employee-school */
app.get('/employeeschool', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM employee_school ORDER BY email_employee COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/employeeschoolinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO employee_school (cnpj_school, email_employee) VALUES ('" + req.body.cnpj_school + "', '" + req.body.email_employee + "')";
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close();
	res.end();
});

app.post('/employeeschooledelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM employee_school WHERE email_employee = '" + 
	req.body.email_employee + "' AND cnpj_school = '" + req.body.cnpj_school + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
