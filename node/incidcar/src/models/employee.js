module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        Cargo : DataTypes.STRING
    });
  
    Employee.associate = function (models) {
        Employee.hasOne(models.Incident, {
            foreignKey: 'EmployeeId'
        });
        Employee.hasOne(models.Process, {
            foreignKey: 'ManagerId'
        });
        Employee.belongsTo(models.User, {
            foreignKey: 'UserId',
            onDelete : "CASCADE"
        });
        Employee.belongsToMany(models.Process, { 
            through: 'EmployeeProcess',
            foreignKey: 'ProcessId',
            as: 'processes',
            onDelete : "CASCADE"
        });
    };

    return Employee;
}