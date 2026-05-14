const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postOwnership = require('../permissions/postOwnership');
const {toggleLikePost} = require('../controllers/postController');


const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', authMiddleware, createPost);
router.put('/:id',
   authMiddleware,
   postOwnership,
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