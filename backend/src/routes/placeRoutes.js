const express = require('express');
const router = express.Router();

const validateObjectId =
  require('../validators/validateObjectId');
const {
  protect,
  admin
} = require('../middlewares/authMiddleware');
const validatePlace =
  require('../validators/validatePlace');
const sanitizePlace =
  require('../validators/sanitizePlace');
const {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');

router.get('/', getPlaces);
router.get('/:id', validateObjectId(), getPlaceById);

router.post(
  '/',
  protect,
  admin,
  sanitizePlace,
  validatePlace,
  createPlace
);
router.patch(
  '/:id',
  protect,
  admin,
  validateObjectId(),
  sanitizePlace,
  validatePlace,
  updatePlace
);
router.delete(
  '/:id',
  protect,
  admin,
  validateObjectId(),
  deletePlace
);

module.exports = router;