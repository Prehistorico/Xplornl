const express = require('express');
const router = express.Router();

const Review = require('../models/Review');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middlewares/checkOwnership');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');
const {
  validateCreateReview,
  validateUpdateReview
} = require('../validators/validateReview');
const {
  createReview,
  getReviews,
  getReviewsByPlace,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  getPendingReviews
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.get('/pending', protect, admin, getPendingReviews);
router.get('/place/:placeId', validateObjectId('placeId'), getReviewsByPlace);
router.get('/:id', validateObjectId(), getReviewById);

router.post('/', protect, validateCreateReview, createReview);
router.patch(
  '/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Review,
    resourceName: 'Reseña',
    attachAs: 'review'
  }),
  validateUpdateReview,
  updateReview
);
router.delete(
  '/:id',
  protect,
  validateObjectId(),
  checkOwnership({
    model: Review,
    resourceName: 'Reseña',
    attachAs: 'review'
  }),
  deleteReview
);


router.patch('/:id/approve', protect, admin, validateObjectId(), approveReview);
router.patch('/:id/reject', protect, admin, validateObjectId(), rejectReview);

module.exports = router;