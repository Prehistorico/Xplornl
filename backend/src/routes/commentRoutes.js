const express = require('express');
const router = express.Router();

const {
  createComment,
  getComments,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createComment);
router.get('/', getComments);

router.get('/post/:postId', getCommentsByPost);

router.get('/:id', getCommentById);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;