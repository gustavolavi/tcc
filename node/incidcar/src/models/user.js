module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });
  
    User.associate = function (models) {
        User.hasMany(models.Incident, {
            foreignKey: 'userId'
        });
        User.hasOne(models.Employee, {
            foreignKey: 'userId'
        });
    };

    return User;
}