const express = require('express');
const router = express.Router();

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
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');


router.get('/', protect, getReviews);
router.get('/pending', protect, admin, getPendingReviews);

router.get('/place/:placeId', getReviewsByPlace);
router.get('/:id', getReviewById);

router.patch('/:id/approve', protect, admin, approveReview);
router.patch('/:id/reject', protect, admin, rejectReview);

router.post('/', protect, validateCreateReview, createReview);
router.patch('/:id', protect, validateUpdateReview, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;