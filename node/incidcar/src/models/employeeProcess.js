
var { Employee, Process } = require('./');

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('EmployeeProcess', {
        EmployeeId: {
            type: DataTypes.INTEGER,
            model: Process,
            key: 'id'
        },
        ProcessId: {
            type: DataTypes.INTEGER,
            model: Employee,
            key: 'id'
        }
    });
  
    return Task;
}