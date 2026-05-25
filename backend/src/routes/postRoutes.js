const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

const validateObjectId = require('../validators/validateObjectId');
const uploadImages = require('../middleware/uploadImages');
const checkOwnership = require('../middleware/checkOwnership');
const {authAdmin} = require('../middleware/authMiddleware');
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
router.get('/pending', authAdmin, getPendingPosts);
router.get('/:id', validateObjectId(), getPostById);

router.post('/', uploadImages, validateCreatePost, createPost);
router.patch(
'/:id',
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
  validateObjectId(),
  checkOwnership({
    model: Post,
    resourceName: 'Post',
    attachAs: 'post'
  }),
  deletePost
);

router.patch('/:id/approve', authAdmin, validateObjectId(), approvePost);
router.patch('/:id/reject', authAdmin, validateObjectId(), rejectPost);

router.patch('/:id/like', validateObjectId(), toggleLikePost);

module.exports = router;