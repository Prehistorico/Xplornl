const express = require('express');

const router = express.Router();

const validateObjectId = require('../validators/validateObjectId');

const postOwnership = require('../permissions/postPermissions');

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
  toggleLikePost
} = require('../controllers/postController');

router.get('/', getPosts);

router.get(
  '/:id',
  validateObjectId(),
  getPostById
);

router.post(
  '/',
  validateCreatePost,
  createPost
);

router.put(
  '/:id',
  validateObjectId(),
  postOwnership,
  validateUpdatePost,
  updatePost
);

router.delete(
  '/:id',
  validateObjectId(),
  postOwnership,
  deletePost
);

router.patch(
  '/:id/like',
  validateObjectId(),
  toggleLikePost
);

module.exports = router;