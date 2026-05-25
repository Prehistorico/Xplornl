const express = require('express');
const router = express.Router();

const validateObjectId = require('../validators/validateObjectId');
const uploadImages = require('../middleware/uploadImages');
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
  uploadImages.array('images', 5),
  authAdmin,
  validatePlace,
  createPlace
);
router.patch(
  '/:id',
  uploadImages.array('images', 5),
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