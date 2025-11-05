'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(100), allowNull: false}
    }, {
        tableName: 'categories',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Category.associate = function (models) {
        Category.hasMany(models.Todo, {foreignKey: 'category_id', as: 'todos'});
    };

    return Category;
};