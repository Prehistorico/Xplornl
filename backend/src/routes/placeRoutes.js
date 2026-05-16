const express = require('express');
const router = express.Router();

const roleMiddleware = require('../middleware/roleMiddleware');
const validatePlace = require('../validators/validatePlace');
const sanitizePlace = require('../validators/sanitizePlace');
const validateObjectId = require('../validators/validateObjectId');

const {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');

router.get('/', getPlaces);
router.get(
  '/:id',
  validateObjectId(),
  getPlaceById
);

router.post(
  '/',
  roleMiddleware('admin'),
  sanitizePlace,
  validatePlace,
  createPlace
);
router.put(
  '/:id',
  roleMiddleware('admin'),
  validateObjectId(),
  sanitizePlace,
  validatePlace,
  updatePlace
);
router.delete(
  '/:id',
  roleMiddleware('admin'),
  validateObjectId(),
  deletePlace
);

module.exports = router;