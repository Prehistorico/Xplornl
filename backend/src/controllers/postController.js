const Post = require('../models/Post');
const Comment = require('../models/Comment');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const pickFields = require('../utils/pickFields');

exports.createPost = catchAsync(async (req, res) => {

  const post = await Post.create({

    ...pickFields(req.body, [
      'title',
      'description',
      'place',
      'category'
    ]),

    user: req.user.id
  });

  res.status(201).json({

    message: 'Post creado',
    post
  });
});
exports.getPosts = catchAsync(async (req, res) => {

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

  if (category) {
    filter.category = category;
  }

  if (place) {
    filter.place = place;
  }

  if (status) {
    filter.status = status;
  }

  const page = Math.max(
    parseInt(req.query.page) || 1,
    1
  );

  const limit = Math.min(
    Math.max(parseInt(req.query.limit) || 10, 1),
    50
  );

  const skip = (page - 1) * limit;

  const totalPosts = await Post.countDocuments(filter);

  const posts = await Post.find(filter)

    .populate('user', 'username name')
    .populate('place', 'name')
    .populate('category', 'name')

    .sort({ createdAt: -1 })

    .skip(skip)
    .limit(limit)

    .lean();

  const postIds = posts.map(post => post._id);

  const commentCounts = await Comment.aggregate([
    {
      $match: {
        post: { $in: postIds }
      }
    },
    {
      $group: {
        _id: '$post',
        count: { $sum: 1 }
      }
    }
  ]);

  const commentMap = {};

  commentCounts.forEach(item => {
    commentMap[item._id.toString()] = item.count;
  });

  const postsWithCounts = posts.map(post => ({
    ...post,
    totalComments:
      commentMap[post._id.toString()] || 0
  }));

  res.json({

    currentPage: page,

    totalPages: Math.ceil(totalPosts / limit),

    totalPosts,

    posts: postsWithCounts
  });
});
exports.getPostById = catchAsync(async (req, res, next) => {

  const post = await Post.findById(req.params.id)

    .populate('user', 'username name')
    .populate('place', 'name description')
    .populate('category', 'name');

  if (!post) {
    return next(
      new AppError('Post no encontrado', 404)
    );
  }

  const comments = await Comment.find({
    post: req.params.id
  })

    .populate('user', 'username')

    .sort({ createdAt: -1 });

  res.json({
    ...post.toObject(),
    comments
  });
});
exports.updatePost = catchAsync(async (req, res) => {

  const post = req.post;

  const updates = pickFields(req.body, [
    'title',
    'description',
    'place',
    'category',
    'status'
  ]);

  Object.assign(post, updates);

  await post.save();

  res.json({

    message: 'Post actualizado',
    post
  });
});
exports.deletePost = catchAsync(async (req, res) => {

  const post = req.post;

  await Comment.deleteMany({
    post: post._id
  });

  await post.deleteOne();

  res.json({
    message: 'Post eliminado'
  });
});
exports.toggleLikePost = catchAsync(async (req, res, next) => {

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new AppError('Post no encontrado', 404)
    );
  }

  const userId = req.user.id;

  const alreadyLiked = post.likes.some(
    user => user.toString() === userId
  );

  if (alreadyLiked) {

    post.likes = post.likes.filter(
      user => user.toString() !== userId
    );

  } else {

    post.likes.push(userId);
  }

  await post.save();

  res.json({

    message: alreadyLiked
      ? 'Like removido'
      : 'Like agregado',

    totalLikes: post.likes.length,

    liked: !alreadyLiked
  });
});