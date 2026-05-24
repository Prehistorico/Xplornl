const express = require('express');
const router = express.Router();

const Post =
  require('../models/Post');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middleware/checkOwnership');
const {
  authUser, 
  authAdmin
} = require('../middleware/authMiddleware');
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
router.get('/pending', authUser, authAdmin, getPendingPosts);
router.get('/:id', validateObjectId(), getPostById);

router.post('/', authUser, validateCreatePost, createPost);
router.patch(
'/:id',
  authUser,
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
  authUser,
  validateObjectId(),
  checkOwnership({
    model: Post,
    resourceName: 'Post',
    attachAs: 'post'
  }),
  deletePost
);


router.patch('/:id/approve', authUser, authAdmin, validateObjectId(), approvePost);
router.patch('/:id/reject', authUser, authAdmin, validateObjectId(), rejectPost);

router.patch('/:id/like', authUser, validateObjectId(),  toggleLikePost);

module.exports = router;