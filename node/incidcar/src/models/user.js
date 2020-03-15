
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Name: DataTypes.STRING,
        Email: DataTypes.STRING,
        Password: DataTypes.STRING,
    });

    User.associate = function (models) {
        User.hasMany(models.Incident, {
            foreignKey: 'UserId',
            onDelete: 'set null',
            onUpdate: 'set null'
        });
        User.hasOne(models.Employee, {
            foreignKey: 'UserId',
            onDelete: 'set null',
            onUpdate: 'set null'
        });
    };

    return User;
}