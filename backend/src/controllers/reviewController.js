const Review = require('../models/Review');
const Place = require('../models/Place');

const appError = require('../utils/appError');
const containsBannedWords = require('../utils/containsBannedWords');

exports.createReview = async (req, res, next) => {
  try {
    const {
      title,
      description,
      rating,
      place
    } = req.body;

    const placeExists = await Place.findById(place);

    if (!placeExists) {
      return next(
        new appError('Place no encontrado', 404)
      );
    }

    const existingReview = await Review.findOne({
      user: req.user.id,
      place
    });

    if (existingReview) {
      return next(
        new appError(
          'Ya has dejado una reseña para este lugar',
          400
        )
      );
    }

    const hasBannedWords =
      containsBannedWords(title) ||
      containsBannedWords(description);

    if (hasBannedWords) {
      return next(
        new appError(
          'La reseña contiene lenguaje prohibido',
          400
        )
      );
    }

    const review = await Review.create({
      title,
      description,
      rating,
      place,
      user: req.user.id
    });

    res.status(201).json({
      message: 'Reseña creada',
      review
    });

  } catch (error) {
    if (error.code === 11000) {
      return next(
        new appError(
          'Ya has dejado una reseña para este lugar',
          400
        )
      );
    }

    next(error);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    let filter = {};

    if (req.user?.role !== 'admin') {
      filter.status = 'approved';
    }

    const reviews = await Review.find(filter)
      .populate('user', 'username')
      .populate('place', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    next(error);
  }
};
exports.getReviewsByPlace = async (req, res, next) => {
  try {
    let filter = {
      place: req.params.placeId
    };

    if (req.user?.role !== 'admin') {
      filter.status = 'approved';
    }

    const reviews = await Review.find(filter)
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    next(error);
  }
};
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'username')
      .populate('place', 'name');

    if (!review) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    if (
      review.status !== 'approved' &&
      req.user?.role !== 'admin'
    ) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    res.json(review);

  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    if (
      review.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new appError('No autorizado', 403)
      );
    }

    const {
      title,
      description,
      rating
    } = req.body;

    const hasBannedWords =
      containsBannedWords(title) ||
      containsBannedWords(description);

    if (hasBannedWords) {
      return next(
        new appError(
          'La reseña contiene lenguaje prohibido',
          400
        )
      );
    }

    if (title !== undefined) {
      review.title = title;
    }

    if (description !== undefined) {
      review.description = description;
    }

    if (rating !== undefined) {
      review.rating = rating;
    }

    await review.save();

    res.json({
      message: 'Reseña actualizada',
      review
    });

  } catch (error) {
    next(error);
  }
};
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    if (
      review.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new appError('No autorizado', 403)
      );
    }

    await review.deleteOne();

    res.json({
      message: 'Reseña eliminada'
    });

  } catch (error) {
    next(error);
  }
};
exports.approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    review.status = 'approved';

    await review.save();

    res.json({
      message: 'Reseña aprobada',
      review
    });

  } catch (error) {
    next(error);
  }
};

exports.rejectReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new appError('Reseña no encontrada', 404)
      );
    }

    review.status = 'rejected';

    await review.save();

    res.json({
      message: 'Reseña rechazada',
      review
    });

  } catch (error) {
    next(error);
  }
};
exports.getPendingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      status: 'pending'
    })
      .populate('user', 'username')
      .populate('place', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    next(error);
  }
};