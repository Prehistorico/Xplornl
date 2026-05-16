const Post = require('../models/Post');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const checkPostOwnership = catchAsync(async (
  req,
  res,
  next
) => {

  const post = await Post.findById(req.params.id);

  if (!post) {

    return next(
      new AppError('Post no encontrado', 404)
    );
  }

  const isOwner =
    post.user.toString() === req.user.id;

  const isAdmin =
    req.user.role === 'admin';

  if (!isOwner && !isAdmin) {

    return next(
      new AppError('No autorizado', 403)
    );
  }

  req.post = post;

  next();
});
module.exports = checkPostOwnership;