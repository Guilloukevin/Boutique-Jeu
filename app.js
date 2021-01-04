const express = require('express')
,     app = express()
,     mysql = require('mysql')
,     util = require('util')
,     path = require('path')
,     port = 3000
,     session = require('express-session')
,     connectFlash = require('connect-flash');

// Active les messages Flash
app.use(connectFlash());

// .env
require('dotenv').config()

// Middleware - Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Session
app.use(session({
  secret: 'shhuuuuut',
  resave: false,
  saveUninitialized: true,
  name: 'biscuit',
  cookie: {
    maxAge: 1000 * 60 * 60 *24 // 24 heures
  }
}))

// EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// MySQL
const db =  mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté au serveur MySQL');
});

const query = util.promisify(db.query).bind(db);
global.querySql = query;

// Router
const indexRoute = require('./routes/index.route');
const machineRoute = require('./routes/machine.route');
const jeuxRoute = require('./routes/jeux.route');
const authRoute = require('./routes/auth.Route');

// URL
app.use('/', indexRoute);
app.use('/machine', machineRoute);
app.use('/jeux', jeuxRoute);
app.use('/auth', authRoute);
// 404
app.get('*', function(req, res, next){
  res.status(404);
  res.render('404.ejs');
});
 
// Listen
app.listen(port, () => {
  console.log(`Tourne sur le port : ${port}`);
});