const express = require('express');
const router = express.Router();

const Review = require('../models/Review');
const validateObjectId =
  require('../validators/validateObjectId');
const checkOwnership =
  require('../middleware/checkOwnership');
const {
  authUser,
  authAdmin
} = require('../middleware/authMiddleware');
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
router.get('/pending', authUser, authAdmin, getPendingReviews);
router.get('/place/:placeId', validateObjectId('placeId'), getReviewsByPlace);
router.get('/:id', validateObjectId(), getReviewById);

router.post('/', authUser, validateCreateReview, createReview);
router.patch(
  '/:id',
  authUser,
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
  authUser,
  validateObjectId(),
  checkOwnership({
    model: Review,
    resourceName: 'Reseña',
    attachAs: 'review'
  }),
  deleteReview
);


router.patch('/:id/approve', authUser, authAdmin, validateObjectId(), approveReview);
router.patch('/:id/reject', authUser, authauthAdmin, validateObjectId(), rejectReview);

module.exports = router;