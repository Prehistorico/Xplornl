const Comment = require('../models/Comment');
const Post = require('../models/Post');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
  const {post, description} = req.body;
  const postExists = await Post.findById(post);

  if (!postExists) {
    return next(
      new AppError('Post no encontrado', 404));
  }

  const comment = await Comment.create({
    post,
    description,
    user: req.user.id
  });

  res.status(201).json({
    message: 'Comentario creado',
    comment
  });
});
exports.getComments = catchAsync(async (req, res) => {
  const filter = {};

  if (req.user?.role !== 'admin') {
    filter.status = 'approved';
  }

  const comments = await Comment.find(filter)
    .populate('user', 'username')
    .populate('post', 'title')

    .sort({ createdAt: -1 });

  res.json(comments);
});
exports.getCommentsByPost = catchAsync(async (req, res) => {
    const filter = {
      post: req.params.postId
    };

    if (req.user?.role !== 'admin') {
      filter.status = 'approved';
    }

    const comments = await Comment.find(filter)
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
});
exports.getCommentById = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id)

        .populate('user', 'username')
        .populate('post', 'title');

    if (!comment) {
      return next(
        new AppError('Comentario no encontrado', 404));
    }

    if (
      comment.status !== 'approved' &&
      req.user?.role !== 'admin'
    ) {
      return next(
        new AppError('Comentario no encontrado',404));
    }

    res.json(comment);
});
exports.updateComment = catchAsync(async (req, res) => {
    const comment = req.comment;

    if (req.body.description !== undefined) {
      comment.description =
        req.body.description;
    }

    await comment.save();

    res.json({
      message: 'Comentario actualizado',
      comment
    });
});
exports.deleteComment =catchAsync(async (req, res) => {
    await req.comment.deleteOne();

    res.json({
      message: 'Comentario eliminado'
    });
});


exports.toggleLikeComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new AppError('Comentario no encontrado', 404));
    }

    const userId = req.user.id;

    const alreadyLiked =
      comment.likes.users.some(
        user => user.toString() === userId
      );

    if (alreadyLiked) {

      comment.likes.users =
        comment.likes.users.filter(
          user =>
            user.toString() !== userId
        );

    } else {
      comment.likes.users.push(userId);
    }

    comment.likes.count = comment.likes.users.length;

    await comment.save();

    res.json({

      message: alreadyLiked
        ? 'Like removido'
        : 'Like agregado',

      totalLikes: comment.likes.count,
      liked: !alreadyLiked
    });
});

exports.approveComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new AppError('Comentario no encontrado',404));
    }

    comment.status = 'approved';

    await comment.save();

    res.json({
      message: 'Comentario aprobado',
      comment
    });
});
exports.rejectComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new AppError('Comentario no encontrado', 404));
    }

    comment.status = 'rejected';

    await comment.save();

    res.json({
      message: 'Comentario rechazado',
      comment
    });
});

exports.getPendingComments = catchAsync(async (req, res) => {
    const comments = await Comment.find({status: 'pending'})
        .populate('user', 'username')
        .populate('post', 'title')
        .sort({ createdAt: -1 });
    res.json(comments);
});