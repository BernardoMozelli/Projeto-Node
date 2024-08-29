/*comandos npm
npm init
npm instal nodemon -g 
npm install -- save express
npm install express-session
npm install --save body-parser
npm install --save mysql
npm install ejs -save
*/

//require do express e do session
const express = require('express');
const session = require("express-session");
const path = require('path');
const app = express();

//require do bodyparser responsável por capturar valores do form
const bodyParser = require("body-parser");

//criando a sessão
app.use(session({ secret: "ssshhhhh" }));

//config engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

//config bodyparser para leitura de post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rota index(login)
app.get('/', (req, res) => {
    const message = ' ';
    req.session.destroy();
    res.render('login', { message: message });
});

//rota para página cadastro
app.get('/cadastro', function (req, res) {
    res.render('cadastro'); // Render the 'cadastro' view template
});


//require do mysql
const mysql = require("mysql");
const { resolveSoa } = require('dns');


//conexão com banco mysql
function conectiondb() {
    var con = mysql.createConnection({
        host: 'localhost', // O host do banco. Ex: localhost
        user: 'bernardo', // Um usuário do banco. Ex: user 
        password: '250317', // A senha do usuário. Ex: user123
        database: 'node_login' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    });

    //verifica conexao com o banco
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    });

    return con;
}

//rota para a página home
app.get("/views/home", function (req, res) {

    //verifica se existe seção ativa
    if (req.session.user) {
        var con = conectiondb();
        var query2 = 'SELECT * FROM users WHERE email LIKE ?';
        con.query(query2, [req.session.user], function (err, results) {
            res.render('views/home', { message: results });

        });

    } else {
        res.redirect("/");
    }

});

//método post do cadastro
app.post('/cadastro', function (req, res) {

    var username = req.body.nome;
    var email = req.body.email;
    var pass = req.body.pwd;

    var con = conectiondb();

    var queryConsulta = 'SELECT * FROM users WHERE email LIKE ?';

    con.query(queryConsulta, [email], function (err, results) {
        if (results.length > 0) {
            var message = 'E-mail já cadastrado';
            res.render('views/registro', { message: message });
        } else {
            var query = 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?)';

            con.query(query, [username, email, pass], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    console.log("Usuario adicionado com email " + email);
                    var message = "ok";
                    res.render('views/registro', { message: message });
                }
            });
        }
    });
});

//método post do login
app.post('/log', function (req, res) {
    //pega os valores digitados pelo usuário
    var email = req.body.email;
    var pass = req.body.pass;
    //conexão com banco de dados
    var con = conectiondb();
    //query de execução
    var query = 'SELECT * FROM users WHERE pass = ? AND email LIKE ?';

    //execução da query
    con.query(query, [pass, email], function (err, results) {
        if (results.length > 0) {
            req.session.user = email; //seção de identificação            
            console.log("Login feito com sucesso!");
            res.render('views/home', { message: results });
        } else {
            var message = 'Login incorreto!';
            res.render('views/login', { message: message });
        }
    });
});

app.post('/update', function (req, res) {
    //pega os valores digitados pelo usuário

    console.log("entrou");

    var email = req.body.email;
    var pass = req.body.pwd;
    var username = req.body.nome;
    var idade = req.body.idade;
    //conexão com banco de dados
    var con = conectiondb();
    //query de execução
    var query = 'UPDATE users SET username = ?, pass = ?, idade = ? WHERE email LIKE ?';


    //execução da query
    con.query(query, [username, pass, idade, req.session.user], function (err, results) {

        var query2 = 'SELECT * FROM users WHERE email LIKE ?';
        con.query(query2, [req.session.user], function (err, results) {
            res.render('views/home', { message: results });
        });

    });
});

app.post('/delete', function (req, res) {
    //pega os valores digitados pelo usuário

    var username = req.body.nome;

    //conexão com banco de dados
    var con = conectiondb();
    //query de execução
    var query = 'DELETE FROM users WHERE email LIKE ?';


    //execução da query
    con.query(query, [req.session.user], function (err, results) {
        res.redirect('/');
    });
});

//executa servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
