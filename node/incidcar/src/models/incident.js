module.exports = (sequelize, DataTypes) => {
    const Incident = sequelize.define('Incident', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Incident.associate = function (models) {
        Incident.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        Incident.belongsTo(models.Employee, {
            foreignKey: 'employeeId'
        });
    };

    return Incident;
}