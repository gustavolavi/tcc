module.exports = (sequelize, DataTypes) => {
    const Process = sequelize.define('Process', {
        Name: DataTypes.STRING,
        Description: DataTypes.STRING
    });

    Process.associate = function (models) {
        Process.hasMany(models.Task, {
            as: 'Tasks'
        });
        Process.belongsTo(models.Employee, {
            foreignKey: 'ManagerId',
            as: 'Manager'
        });
        Process.belongsToMany(models.Employee, {
            through: 'EmployeeProcess',
            foreignKey: 'EmployeeId',
            as: 'Employees'
        });
    };

    return Process;
}
