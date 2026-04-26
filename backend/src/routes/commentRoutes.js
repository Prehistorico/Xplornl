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

router.get('/', getComments);
router.get('/post/:postId', getCommentsByPost);
router.get('/:id', getCommentById);

router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;