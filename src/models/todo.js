'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // Validation on field level
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 120],
                    msg: 'Title length must be between 2 and 120 characters'
                }
            }
        },
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