const {Category} = require('../models');
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({message: 'Category not found'});
        res.json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const cat = await Category.create(req.body);

        res.status(201).json({ status: 'success', data: cat });
    } catch (err) {
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const cat = await Category.update(req.params.id, req.body);
        res.json({ status: 'success', data: cat });
    } catch (err) {
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await Category.delete(req.params.id);
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
};
