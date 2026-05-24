const express = require('express');
const router = express.Router();

const validateObjectId = require('../validators/validateObjectId');
const {
  authUser,
  authAdmin
} = require('../middleware/authMiddleware');
const validateUser =
  require('../validators/validateUser');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', authUser, authAdmin, getUsers);
router.get('/:id', authUser, validateObjectId(), getUserById);

router.patch('/:id', authUser, validateObjectId(), validateUser, updateUser);
router.delete('/:id', authUser, validateObjectId(), deleteUser);

module.exports = router;