const express = require('express');
const router = express.Router();

const validateObjectId =
  require('../validators/validateObjectId');
const {
  authUser,
  authAdmin
} = require('../middleware/authMiddleware');
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

router.post('/', authUser, authAdmin, validateCreateCategory, createCategory);
router.patch('/:id', authUser, authAdmin, validateObjectId(), validateUpdateCategory, updateCategory);
router.delete('/:id', authUser, authAdmin, validateObjectId(), deleteCategory);

module.exports = router;