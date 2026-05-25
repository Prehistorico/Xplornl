const express = require('express');
const router = express.Router();

const validateObjectId = require('../validators/validateObjectId');
const {authAdmin} = require('../middleware/authMiddleware');
const validatePlace = require('../validators/validatePlace');
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
  authAdmin,
  validatePlace,
  createPlace
);
router.patch(
  '/:id',
  authAdmin,
  validateObjectId(),
  validatePlace,
  updatePlace
);
router.delete(
  '/:id',
  authAdmin,
  validateObjectId(),
  deletePlace
);

module.exports = router;