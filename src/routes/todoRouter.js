const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const validate = require('../middleware/validate');
const {createTodoValidator, updateTodoValidator} = require('../validators/todoValidator');
const auth = require('../middleware/auth/auth.middleware.js');
const {isOwnerOrAdmin, isAdmin} = require('../middleware/role.middleware');
const {Todo} = require('../models');

router.get('/',
    auth,
    async (req, res) => {
        try {
            if (req.user.role === 'admin') {
                const todos = todoController.getAllTodos(req, res);
                return res.json(todos);
            }

            const todos = await Todo.findAll({where: {user_id: req.user.userId}});
            res.json(todos);
        } catch (error) {
            res.status(500).json({message: 'Server error'});
        }
    }
);

router.get('/:id', todoController.getTodoById);

// Only auth users can create task
router.post('/',
    auth,
    createTodoValidator,
    validate,
    todoController.createTodo
);

router.put('/:id',
    auth,
    updateTodoValidator,
    isOwnerOrAdmin(async (req) => {
        const todo = await Todo.findByPk(req.params.id);
        return todo ? todo.user_id : null;
    }),
    validate,
    todoController.updateTodo);

router.delete('/:id',
    auth,
    isAdmin(async (req) => {
        const todo = await Todo.findByPk(req.params.id);
        return todo ? todo.user_id : null;
    }),
    todoController.deleteTodo
);

module.exports = router;

