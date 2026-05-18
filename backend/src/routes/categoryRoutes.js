const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const {
  validateCreateCategory,
  validateUpdateCategory
} = require('../validators/validateCategory');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');


router.get('/', getCategories);
router.get('/:id', getCategoryById);

router.post('/', protect, admin, validateCreateCategory, createCategory);
router.patch('/:id', protect, admin, validateUpdateCategory, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;