'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        email: { type: DataTypes.STRING(100), allowNull: false, unique: true, validate: { isEmail: true } },
        password: { type: DataTypes.TEXT, allowNull: false },
        role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'user' },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'users',
        underscored: true,
        timestamps: false
    });

    User.associate = function(models) {
        User.hasMany(models.Todo, { foreignKey: 'user_id', as: 'todos' });
    };

    return User;
};
