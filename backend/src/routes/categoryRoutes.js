const express = require('express');
const router = express.Router();

const roleMiddleware = require('../middleware/roleMiddleware');

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategoryById);

router.post('/', roleMiddleware('admin'), createCategory);
router.put('/:id', roleMiddleware('admin'), updateCategory);
router.delete('/:id', roleMiddleware('admin'), deleteCategory);

module.exports = router;