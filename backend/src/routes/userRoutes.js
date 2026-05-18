const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../permissions/rolePermissions');
const validateUser = require('../validators/validateUser');

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', roleMiddleware('admin'), getUsers);

router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, validateUser, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;