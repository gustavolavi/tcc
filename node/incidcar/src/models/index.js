'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;

sequelize = new Sequelize('mysql://root:root@localhost:6033/incidcar');

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.drop({ force: true });
sequelize.sync({ force: true })
  .then(() => {
    db.User.create({ Id: 1 ,Name: 'Gustavo', Email: 'gustavo@email.com', Password: '123' });
    db.User.create({ Id: 2 , Name: 'Tiago', Email: 'Tiago@email.com', Password: '123' });
    db.User.create({ Id: 3 , Name: 'Lucas', Email: 'Lucas@email.com', Password: '123' });
    db.User.create({ Id: 4 , Name: 'Maria', Email: 'Maria@email.com', Password: '123' });
    db.User.create({ Id: 5 , Name: 'Ana', Email: 'Ana@email.com', Password: '123' });

    db.Employee.create({ Id: 1 , UserId: '1' });
    db.Employee.create({ Id: 2 , UserId: '2' });
    db.Employee.create({ Id: 3 ,  UserId: '3' });

    db.Incident.create({ Id: 1 , Title: 'Incident 1', Description: 'descrition 1', UserId: '3', EmployeeId: '1' });
    db.Incident.create({ Id: 2 , Title: 'Incident 2', Description: 'descrition 2', UserId: '4', EmployeeId: '2' });
    db.Incident.create({ Id: 3 , Title: 'Incident 3', Description: 'descrition 3', UserId: '5', EmployeeId: '3' });
    db.Incident.create({ Id: 4 , Title: 'Incident 4', Description: 'descrition 4', UserId: '5', EmployeeId: '2' });
    db.Incident.create({ Id: 5 , Title: 'Incident 5', Description: 'descrition 5', UserId: '4', EmployeeId: '1' });

    db.Process.create({ Id: 1 , Name: 'Process 1', Description: 'descrition 1', ManagerId: '1' });
    db.Process.create({ Id: 2 , Name: 'Process 2', Description: 'descrition 2', ManagerId: '2' });
    db.Process.create({ Id: 3 , Name: 'Process 3', Description: 'descrition 3', ManagerId: '3' });

    db.Task.create({ Id: 1 , Name: 'task 1', Description: 'descrition 1', ProcessId: '1' });
    db.Task.create({ Id: 2 , Name: 'task 2', Description: 'descrition 2', ProcessId: '1' });
    db.Task.create({ Id: 3 , Name: 'task 3', Description: 'descrition 3', ProcessId: '2' });
    db.Task.create({ Id: 4 , Name: 'task 4', Description: 'descrition 4', ProcessId: '2' });
    db.Task.create({ Id: 5 , Name: 'task 5', Description: 'descrition 5', ProcessId: '3' });
    db.Task.create({ Id: 6 , Name: 'task 6', Description: 'descrition 6', ProcessId: '3' });
    db.Task.create({ Id: 7 , Name: 'task 7', Description: 'descrition 7', ProcessId: '3' });
    
    db.EmployeeProcess.create({ Id: 1 , EmployeeId: '1', ProcessId: '2' });
    db.EmployeeProcess.create({ Id: 2 , EmployeeId: '2', ProcessId: '3' });
    db.EmployeeProcess.create({ Id: 3 , EmployeeId: '3', ProcessId: '1' });
    db.EmployeeProcess.create({ Id: 4 , EmployeeId: '2', ProcessId: '3' });
    db.EmployeeProcess.create({ Id: 5 , EmployeeId: '3', ProcessId: '2' });

  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
