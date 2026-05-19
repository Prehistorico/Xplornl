const express = require('express');
const router = express.Router();

const Post =
  require('../models/Post');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middlewares/checkOwnership');
const {
  protect, 
  admin
} = require('../middlewares/authMiddleware');
const {
  validateCreatePost,
  validateUpdatePost
} = require('../validators/validatePost');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
  getPendingPosts,
  toggleLikePost
} = require('../controllers/postController');


router.get('/', getPosts);
router.get('/pending', protect, admin, getPendingPosts);
router.get('/:id', validateObjectId(), getPostById);

router.post('/', protect, validateCreatePost, createPost);
router.patch(
'/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Post,
    resourceName: 'Post',
    attachAs: 'post'
  }),
  validateUpdatePost,
  updatePost
);
router.delete(
  '/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Post,
    resourceName: 'Post',
    attachAs: 'post'
  }),
  deletePost
);


router.patch('/:id/approve', protect, admin, validateObjectId(), approvePost);
router.patch('/:id/reject', protect, admin, validateObjectId(), rejectPost);

router.patch('/:id/like', protect, validateObjectId(),  toggleLikePost);

module.exports = router;