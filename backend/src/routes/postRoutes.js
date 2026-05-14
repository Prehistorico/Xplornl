const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postOwnership = require('../permissions/postOwnership');
const {toggleLikePost} = require('../controllers/postController');
const {validateCreatePost, validateUpdatePost} = require('../validators/validatePost');

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);

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