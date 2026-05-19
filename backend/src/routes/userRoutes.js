const express = require('express');
const router = express.Router();

const validateObjectId =
  require('../validators/validateObjectId');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');
const validateUser =
  require('../validators/validateUser');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, validateObjectId(), getUserById);

router.patch('/:id', protect, validateObjectId(), validateUser, updateUser);
router.delete('/:id', protect, validateObjectId(), deleteUser);

module.exports = router;