const { Todo, Category } = require('../models');
const { Op } = require('sequelize');

exports.getAllTodos = async (req, res) => {
    try {
        const {
            category,
            search,
            sort = 'created_at:desc',
            page = 1,
            limit = 10
        } = req.query;

        const [sortField, sortOrder] = sort.split(':');

        const where = {};
        if (category) where.category_id = category;
        if (search) where.title = { [Op.iLike]: `%${search}%` };

        const offset = (page - 1) * limit;

        const { rows, count } = await Todo.findAndCountAll({
            where,
            include: [{ model: Category, as: 'category' }],
            order: [[sortField || 'created_at', sortOrder?.toUpperCase() || 'DESC']],
            limit: +limit,
            offset: +offset
        });

        res.json({
            data: rows,
            meta: {
                total: count,
                count: rows.length,
                limit: +limit,
                pages: Math.ceil(count / limit),
                currentPage: +page
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id, {
            include: [{ model: Category, as: 'category' }]
        });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title, category_id, due_date } = req.body;

        const userId = req.user.userId;

        const todo = await Todo.create({
            title,
            category_id,
            due_date,
            user_id: userId
        });

        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        const { title, completed, category_id, due_date } = req.body;

        todo.title = title ?? todo.title;
        todo.completed = completed ?? todo.completed;
        todo.category_id = category_id ?? todo.category_id;
        todo.due_date = due_date ?? todo.due_date;

        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.toggleTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await todo.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
