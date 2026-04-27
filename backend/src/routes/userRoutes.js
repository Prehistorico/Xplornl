const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', roleMiddleware('admin'), getUsers);

router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;