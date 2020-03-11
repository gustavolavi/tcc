var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var usersRouter = require('./src/routes/users');
var incidentRouter = require('./src/routes/incident');
var employeeRouter = require('./src/routes/employee');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.json());

app.use('/users', usersRouter);
app.use('/incidents', incidentRouter);
app.use('/employees', incidentRouter);

module.exports = app;
