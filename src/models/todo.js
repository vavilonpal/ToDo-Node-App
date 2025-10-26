'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: { type: DataTypes.TEXT, allowNull: false },
        completed: { type: DataTypes.BOOLEAN, defaultValue: false },
        due_date: { type: DataTypes.DATE, allowNull: true }
    }, {
        tableName: 'todos',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Todo.associate = function(models) {
        Todo.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    };

    return Todo;
};