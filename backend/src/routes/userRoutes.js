const express = require('express');
const router = express.Router();
const User = require('../models/User');

const validateObjectId = require('../validators/validateObjectId');
const {authAdmin} = require('../middleware/authMiddleware');
const checkOwnership = require('../middleware/checkOwnership');
const validateUser = require('../validators/validateUser');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', authAdmin, getUsers);
router.get(
  '/:id',
  validateObjectId(),
  checkOwnership({
    model: User,
    resourceName: 'Usuario'
  }),
  getUserById
);

router.patch(
  '/:id',
  validateObjectId(),
  checkOwnership({
    model: User,
    resourceName: 'Usuario'
  }),
  validateUser,
  updateUser
);
router.delete(
  '/:id',
  validateObjectId(),
  checkOwnership({
    model: User,
    resourceName: 'Usuario'
  }),
  deleteUser
);

module.exports = router;