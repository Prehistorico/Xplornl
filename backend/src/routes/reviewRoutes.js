const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

const validateObjectId = require('../validators/validateObjectId');
const checkOwnership = require('../middleware/checkOwnership');
const {authAdmin} = require('../middleware/authMiddleware');
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
router.get('/pending', authAdmin, getPendingReviews);
router.get('/place/:placeId', validateObjectId('placeId'), getReviewsByPlace);
router.get('/:id', validateObjectId(), getReviewById);

router.post('/', validateCreateReview, createReview);
router.patch(
  '/:id',
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
  validateObjectId(),
  checkOwnership({
    model: Review,
    resourceName: 'Reseña',
    attachAs: 'review'
  }),
  deleteReview
);


router.patch('/:id/approve', authAdmin, validateObjectId(), approveReview);
router.patch('/:id/reject', authAdmin, validateObjectId(), rejectReview);

module.exports = router;