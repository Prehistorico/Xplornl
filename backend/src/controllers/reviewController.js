const Review = require('../models/Review');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const containsBannedWords = require('../utils/containsBannedWords');
const pickFields = require('../utils/pickFields');

exports.createReview = catchAsync(async (req, res, next) => {
  const {title, description} = req.body;

  const hasBannedWords =
    containsBannedWords(title) ||
    containsBannedWords(description);

  if (hasBannedWords) {
    return next(
      new AppError('La reseña contiene lenguaje prohibido',400));
  }

  const review = await Review.create({

    ...pickFields(req.body, [
      'title',
      'description',
      'rating',
      'place'
    ]),
    user: req.user.id
  });

  res.status(201).json({
    message: 'Reseña creada',
    review
  });
});
exports.getReviews = catchAsync(async (req, res) => {
  const filter = {};

  if (req.user?.role !== 'admin') {
    filter.status = 'approved';
  }

  const reviews = await Review.find(filter)

    .populate('user', 'username')
    .populate('place', 'name')

    .sort({ createdAt: -1 });

  res.json(reviews);
});
exports.getPendingReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({status: 'pending'})

    .populate('user', 'username')
    .populate('place', 'name')

    .sort({ createdAt: -1 });

  res.json(reviews);
});
exports.getReviewsByPlace = catchAsync(async (req, res) => {
  const filter = {place: req.params.placeId};

  if (req.user?.role !== 'admin') {
    filter.status = 'approved';
  }

  const reviews = await Review.find(filter)

    .populate('user', 'username')
    .sort({ createdAt: -1 });

  res.json(reviews);
});
exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

    .populate('user', 'username')
    .populate('place', 'name');

  if (!review) {
    return next(
      new AppError('Reseña no encontrada', 404)
    );
  }

  if (
    review.status !== 'approved' &&
    req.user?.role !== 'admin'
  ) {
    return next(
      new AppError('Reseña no encontrada', 404)
    );
  }

  res.json(review);
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const review = req.review;
  const {title, description} = req.body;

  const hasBannedWords =
    containsBannedWords(title) ||
    containsBannedWords(description);

  if (hasBannedWords) {
    return next(
      new AppError('La reseña contiene lenguaje prohibido', 400));
  }

  const updates = pickFields(req.body, [
    'title',
    'description',
    'rating'
  ]);

  Object.assign(review, updates);

  await review.save();

  res.json({
    message: 'Reseña actualizada',
    review
  });
});
exports.deleteReview = catchAsync(async (req, res) => {
  await req.review.deleteOne();

  res.json({
    message: 'Reseña eliminada'
  });
});

exports.approveReview = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Reseña no encontrada', 404);
  }

  review.status = 'approved';

  await review.save();

  res.json({
    message: 'Reseña aprobada',
    review
  });
});
exports.rejectReview = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new AppError('Reseña no encontrada', 404);
  }

  review.status = 'rejected';

  await review.save();

  res.json({
    message: 'Reseña rechazada',
    review
  });
});