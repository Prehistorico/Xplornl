const Post = require('../models/Post');
const AppError = require('../utils/appError');
const { isValidObjectId } = require('../utils/validators');

const checkPostOwnership = async (req, res, next) => {
   try {

      const postId = req.params.id;

      if (!isValidObjectId(postId)) {
         return next(new AppError('ID inválido', 400));
      }

      const post = await Post.findById(postId);

      if (!post) {
         return next(new AppError('Post no encontrado', 404));
      }

      const isOwner = post.user.toString() === req.user.id;
      const isAdmin = req.user.role === 'admin';

      if (!isOwner && !isAdmin) {
         return next(new AppError('No autorizado', 403));
      }

      req.post = post;

      next();

   } catch(error) {
      next(error);
   }
};

module.exports = checkPostOwnership;