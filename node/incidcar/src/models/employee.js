module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
  
    Employee.associate = function (models) {
        Employee.hasOne(models.Incident, {
            foreignKey: 'employeeId'
        });
        Employee.hasOne(models.Process, {
            foreignKey: 'managerId'
        });
        Employee.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        Employee.belongsToMany(models.Process, { 
            through: 'EmployeeProcess' 
        });
    };

    return Employee;
}