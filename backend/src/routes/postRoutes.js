const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postOwnership = require('../permissions/postPermissions');
const {toggleLikePost} = require('../controllers/postController');
const {validateCreatePost, validateUpdatePost} = require('../validators/validatePost');
const {validateObjectId} = require('../validators/validateObjectId');

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.get('/', getPosts);
router.get(
   '/:id', 
   validateObjectId,
   getPostById
);

router.post(
   '/',
   authMiddleware,
   validateCreatePost,
   createPost
);
router.put(
   '/:id',
   authMiddleware,
   postOwnership,
   validateUpdatePost,
   updatePost
);
router.delete('/:id',
   authMiddleware,
   postOwnership,
   deletePost
);
router.patch('/:id/like',
   authMiddleware,
   toggleLikePost
);

module.exports = router;