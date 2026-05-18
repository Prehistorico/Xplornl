const express = require('express');
const router = express.Router();
const {
  validateCreateComment, 
  validateUpdateComment
} = require('../validators/validateComment');
const {
  createComment,
  getComments,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
  approveComment,
  rejectComment
} = require('../controllers/commentController');
const {
  createComment,
  getComments,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');


router.get('/', protect, getComments);
router.get('/post/:postId', getCommentsByPost);
router.get('/pending', protect, admin,getPendingComments);
router.get('/:id', getCommentById);

router.patch('/:id/approve', protect, admin, approveComment);
router.patch('/:id/reject', protect, admin, rejectComment);

router.post(
  '/',
  protect,
  validateCreateComment,
  createComment
);
router.put(
  '/:id',
  protect,
  validateUpdateComment,
  updateComment
);
router.delete(
  '/:id',
  protect,
  deleteComment
);

module.exports = router;