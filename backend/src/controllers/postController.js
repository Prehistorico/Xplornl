const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Place = require('../models/Place');
const Category = require('../models/Category');

const { isNonEmptyString, isValidObjectId } = require('../utils/validators');
const appError = require('../utils/appError');

exports.createPost = async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;

    if (!isNonEmptyString(title, 3)) {
      return next(new AppError('Título inválido', 400));
    }

    if (description && !isNonEmptyString(description, 5)) {
      return next(new AppError('Descripción inválida', 400));
    }

    if (tags?.place) {
      if (!isValidObjectId(tags.place)) {
        return next(new AppError('Place inválido', 400));
      }

      const placeExists = await Place.findById(tags.place);
      if (!placeExists) {
        return next(new AppError('Place no existe', 404));
      }
    }

    if (tags?.category) {
      if (!isValidObjectId(tags.category)) {
        return next(new AppError('Category inválida', 400));
      }

      const categoryExists = await Category.findById(tags.category);
      if (!categoryExists) {
        return next(new AppError('Category no existe', 404));
      }
    }

    const post = await Post.create({
      title: title.trim(),
      description,
      tags,
      user: req.user.id
    });

    res.status(201).json({
      message: 'Post creado',
      post
    });

  } catch (error) {
    next(error);
  }
};
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username name')
      .populate('tags.place', 'name')
      .populate('tags.category', 'name')
      .sort({ createdAt: -1 });

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ post: post._id })
          .populate('user', 'username')
          .sort({ createdAt: -1 });

        return {
          ...post.toObject(),
          comments
        };
      })
    );

    res.json(postsWithComments);

  } catch (error) {
    next(error);
  }
};
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username name')
      .populate('tags.place', 'name description')
      .populate('tags.category', 'name');

    if (!post) {
      return next(new AppError('Post no encontrado', 404));
    }

    const comments = await Comment.find({ post: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json({
      ...post.toObject(),
      comments
    });

  } catch (error) {
    next(error);
  }
};
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new AppError('Post no encontrado', 404));
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('No autorizado', 403));
    }

    const { title, description, tags, status } = req.body;

    if (title && !isNonEmptyString(title, 3)) {
      return next(new AppError('Título inválido', 400));
    }

    if (tags?.place && !isValidObjectId(tags.place)) {
      return next(new AppError('Place inválido', 400));
    }

    if (title) post.title = title;
    if (description) post.description = description;
    if (tags) post.tags = tags;

    if (status && req.user.role === 'admin') {
      post.status = status;
    }

    await post.save();

    res.json({
      message: 'Post actualizado',
      post
    });

  } catch (error) {
    next(error);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new AppError('Post no encontrado', 404));
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('No autorizado', 403));
    }

    await post.deleteOne();

    res.json({ message: 'Post eliminado' });

  } catch (error) {
    next(error);
  }
};

