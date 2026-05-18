const Comment = require('../models/Comment');
const Post = require('../models/Post');
const containsBannedWords = require('../utils/containsBannedWords');

const appError = require('../utils/appError');

exports.createComment = async (req, res, next) => {
  try {
    const { post, description } = req.body;

    const postExists = await Post.findById(post);

    if (!postExists) {
      return next(new appError('Post no encontrado', 404));
    }

    const hasBannedWords = containsBannedWords(description);

    if (hasBannedWords) {
      return next(
        new appError(
          'El comentario contiene lenguaje prohibido',
          400
        )
      );
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

  } catch (error) {
    next(error);
  }
};
exports.getComments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user?.role !== 'admin') {
      filter.status = 'approved';
    }

    const comments = await Comment.find(filter)
      .populate('user', 'username')
      .populate('post', 'title')
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    next(error);
  }
};
exports.getCommentsByPost = async (req, res, next) => {
  try {
    let filter = {
      post: req.params.postId
    };

    if (req.user?.role !== 'admin') {
      filter.status = 'approved';
    }

    const comments = await Comment.find(filter)
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    next(error);
  }
};
exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('user', 'username')
      .populate('post', 'title');

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    if (
      comment.status !== 'approved' &&
      req.user?.role !== 'admin'
    ) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    res.json(comment);

  } catch (error) {
    next(error);
  }
};
exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('user', 'username')
      .populate('post', 'title');

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    if (
      comment.status !== 'approved' &&
      req.user?.role !== 'admin'
    ) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    res.json(comment);

  } catch (error) {
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await comment.deleteOne();

    res.json({ message: 'Comentario eliminado' });

  } catch (error) {
    next(error);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    const userId = req.user.id;

    const alreadyLiked = comment.likes.users.some(
      user => user.toString() === userId
    );

    if (alreadyLiked) {
      return next(
        new appError(
          'Ya diste like a este comentario',
          400
        )
      );
    }

    comment.likes.users.push(userId);

    comment.likes.count = comment.likes.users.length;

    await comment.save();

    res.json({
      message: 'Like agregado',
      likes: comment.likes.count
    });

  } catch (error) {
    next(error);
  }
};
exports.unlikeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    const userId = req.user.id;

    const alreadyLiked = comment.likes.users.some(
      user => user.toString() === userId
    );

    if (!alreadyLiked) {
      return next(
        new appError(
          'No has dado like a este comentario',
          400
        )
      );
    }

    comment.likes.users = comment.likes.users.filter(
      user => user.toString() !== userId
    );

    comment.likes.count = comment.likes.users.length;

    await comment.save();

    res.json({
      message: 'Like eliminado',
      likes: comment.likes.count
    });

  } catch (error) {
    next(error);
  }
};


exports.approveComment = async (req, res, next) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    comment.status = 'approved';

    await comment.save();

    res.json({
      message: 'Comentario aprobado',
      comment
    });

  } catch (error) {
    next(error);
  }
};
exports.rejectComment = async (req, res, next) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new appError('Comentario no encontrado', 404)
      );
    }

    comment.status = 'rejected';

    await comment.save();

    res.json({
      message: 'Comentario rechazado',
      comment
    });

  } catch (error) {
    next(error);
  }
};
exports.getPendingComments = async (req, res, next) => {
  try {

    const comments = await Comment.find({
      status: 'pending'
    })
      .populate('user', 'username')
      .populate('post', 'title')
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    next(error);
  }
};