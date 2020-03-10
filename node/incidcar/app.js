var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.json());

app.use('/users', usersRouter);

module.exports = app;
