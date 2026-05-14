const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Place = require('../models/Place');
const Category = require('../models/Category');

const { isNonEmptyString, isValidObjectId } = require('../validators/valdateInputs');
const AppError = require('../utils/appError');

exports.createPost = async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;
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
    const {
      search,
      category,
      place,
      status
    } = req.query;

    const filter = {};

    if (search) {
      filter.$text = {
          $search: search
      };
    }
    if (category && isValidObjectId(category)) {
      filter['tags.category'] = category;
    }
    if (place && isValidObjectId(place)) {
      filter['tags.place'] = place;
    }
    if (status) {
      filter.status = status;
    }
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      50);
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments(filter);

    const posts = await Post.find(filter)
      .populate('user', 'username name')
      .populate('tags.place', 'name')
      .populate('tags.category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts: postsWithComments
    });

  } catch (error) {
    next(error);
  }
};
exports.getPostById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
         return next(new AppError('ID inválido', 400));
      }

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

    const post = req.post;

    const {
      title,
      description,
      tags,
      status
    } = req.body;

    if (title !== undefined) {
      post.title = title;
    }

    if (description !== undefined) {
      post.description = description;
    }

    if (tags !== undefined) {
      post.tags = tags;
    }

    if (status !== undefined) {
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
    if (!isValidObjectId(req.params.id)) {
      return next(new AppError('ID inválido', 400));
    }

    const post = req.post;

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ message: 'Post eliminado' });

  } catch (error) {
    next(error);
  }
};
exports.toggleLikePost = async (req, res, next) => {
   try {
      if (!isValidObjectId(req.params.id)) {
        return next(new AppError('ID inválido', 400));
      }

      const post = await Post.findById(req.params.id);

      if (!post) {
         return next(new AppError('Post no encontrado', 404));
      }

      const userId = req.user.id;

      const alreadyLiked = post.likes.users.some(
         user => user.toString() === userId
      );

      if (alreadyLiked) {

         post.likes.users = post.likes.users.filter(
            user => user.toString() !== userId
         );

      } else {

         post.likes.users.push(userId);

      }

      await post.save();

      res.json({
      message: alreadyLiked
          ? 'Like removido'
          : 'Like agregado',

      totalLikes: post.likes.users.length,
      liked: !alreadyLiked
    });

   } catch(error) {
      next(error);
   }
};
