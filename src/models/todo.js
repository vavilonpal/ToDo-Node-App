'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
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
        due_date: { type: DataTypes.DATE, allowNull: true },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'categories', key: 'id' }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        }
    }, {
        tableName: 'todos',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Todo.associate = function(models) {
        Todo.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
        Todo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return Todo;
};
