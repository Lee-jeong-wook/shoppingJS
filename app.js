const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const PORT = 3000;

const home = require('./src/routes/home');

// 앱 세팅
app.set('views', "./src/views");
app.set('view engine', 'ejs');
// 미들웨어
app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());
app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
}));
//인코딩 위함
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', home);

module.exports = app;