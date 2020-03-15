module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        Name: DataTypes.STRING,
        Description: DataTypes.STRING
    });
  
    Task.associate = function (models) {
        Task.belongsTo(models.Process);
    };

    return Task;
}