var { User, Employee } = require('./');
module.exports = (sequelize, DataTypes) => {
    const Incident = sequelize.define('Incident', {
        Title: DataTypes.STRING,
        Description: DataTypes.STRING
    });

    Incident.associate = function (models) {
        Incident.belongsTo(models.User, {
            foreignKey: 'UserId',
            onDelete : "CASCADE"
        });
        Incident.belongsTo(models.Employee, {
            foreignKey: 'EmployeeId',
            onDelete : "CASCADE"
        });
    };

    return Incident;
}