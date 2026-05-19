const express = require('express');
const router = express.Router();

const Comment =
  require('../models/Comment');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middlewares/checkOwnership');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');
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
  rejectComment,
  getPendingComments,
  toggleLikeComment
} = require('../controllers/commentController');

router.get('/', getComments);
router.get('/pending', protect, admin, getPendingComments);
router.get('/post/:postId', validateObjectId('postId'), getCommentsByPost);
router.get('/:id', validateObjectId(), getCommentById);

router.post('/', protect, validateCreateComment, createComment);
router.patch(
  '/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Comment,
    resourceName: 'Comentario',
    attachAs: 'comment'
  }),
  validateUpdateComment,
  updateComment
);
router.delete(
  '/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Comment,
    resourceName: 'Comentario',
    attachAs: 'comment'
  }),
  deleteComment
);

router.patch('/:id/approve', protect, admin, validateObjectId(), approveComment);
router.patch('/:id/reject', protect, admin, validateObjectId(), rejectComment);

router.patch('/:id/like', protect, validateObjectId(), toggleLikeComment);

module.exports = router;