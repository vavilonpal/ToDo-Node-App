const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const {isAdmin} = require('../middleware/role.middleware');


router.get('/',isAdmin, controller.getAllCategories);
router.get('/:id',isAdmin, controller.getCategoryById);
router.post('/',isAdmin, controller.createCategory);
router.put('/:id',isAdmin, controller.updateCategory);
router.delete('/:id',isAdmin, controller.deleteCategory);

module.exports = router;