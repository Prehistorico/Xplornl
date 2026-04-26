const express = require('express');
const router = express.Router();

const roleMiddleware = require('../middleware/roleMiddleware');

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', roleMiddleware('admin'), getUsers);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;