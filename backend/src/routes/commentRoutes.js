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
  rejectComment,
  getPendingComments,
  likeComment,
  unlikeComment
} = require('../controllers/commentController');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');


router.get('/', protect, getComments);
router.get('/pending', protect, admin, getPendingComments);
router.get('/post/:postId', getCommentsByPost);
router.get('/:id',getCommentById);

router.patch('/:id/approve', protect, admin, approveComment);
router.patch('/:id/reject', protect, admin, rejectComment);

router.patch('/:id/like', protect, likeComment);
router.patch('/:id/unlike', protect, unlikeComment);

router.post('/', protect, validateCreateComment, createComment);
router.put('/:id', protect, validateUpdateComment, updateComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;