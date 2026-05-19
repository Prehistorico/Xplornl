const express = require('express');
const router = express.Router();

const validateObjectId =
  require('../validators/validateObjectId');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');
const {
  validateCreateCategory,
  validateUpdateCategory
} = require('../validators/validateCategory');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');


router.get('/', getCategories);
router.get('/:id', validateObjectId(), getCategoryById);

router.post('/', protect, admin, validateCreateCategory, createCategory);
router.patch('/:id', protect, admin, validateObjectId(), validateUpdateCategory, updateCategory);
router.delete('/:id', protect, admin, validateObjectId(), deleteCategory);

module.exports = router;