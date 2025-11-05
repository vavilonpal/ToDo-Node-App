const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const validate = require('../middleware/validate');
const { createTodoValidator, updateTodoValidator } = require('../validators/todoValidator');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', createTodoValidator, validate, todoController.createTodo);
router.put('/:id', updateTodoValidator, validate, todoController.updateTodo);
router.patch('/:id/toggle', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

