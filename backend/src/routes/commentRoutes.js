const express = require('express');
const router = express.Router();

const Comment =
  require('../models/Comment');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middleware/checkOwnership');
const {
  authUser,
  authAdmin
} = require('../middleware/authMiddleware');
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
router.get('/pending', authUser, authAdmin, getPendingComments);
router.get('/post/:postId', validateObjectId('postId'), getCommentsByPost);
router.get('/:id', validateObjectId(), getCommentById);

router.post('/', authUser, validateCreateComment, createComment);
router.patch(
  '/:id',
  authUser,
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
  authUser,
  validateObjectId(),
  checkOwnership({
    model: Comment,
    resourceName: 'Comentario',
    attachAs: 'comment'
  }),
  deleteComment
);

router.patch('/:id/approve', authUser, authAdmin, validateObjectId(), approveComment);
router.patch('/:id/reject', authUser, authAdmin, validateObjectId(), rejectComment);

router.patch('/:id/like', authUser, validateObjectId(), toggleLikeComment);

module.exports = router;