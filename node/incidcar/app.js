var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser')

var usersRouter = require('./src/routes/users');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.json());

app.use('/users', usersRouter);

module.exports = app;
