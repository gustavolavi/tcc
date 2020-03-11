module.exports = (sequelize, DataTypes) => {
    const Process = sequelize.define('Process', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Process.associate = function (models) {
        Process.hasMany(models.Task);
        Process.belongsTo(models.Employee, {
            foreignKey: 'managerId'
        });
        Process.belongsToMany(models.Employee, { through: 'EmployeeProcess' });
    };

    return Process;
}
