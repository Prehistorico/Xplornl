const express = require('express');
const router = express.Router();

const validateObjectId =
  require('../validators/validateObjectId');
const {
  authUser,
  authAdmin
} = require('../middleware/authMiddleware');
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
  authUser,
  authAdmin,
  sanitizePlace,
  validatePlace,
  createPlace
);
router.patch(
  '/:id',
  authUser,
  authAdmin,
  validateObjectId(),
  sanitizePlace,
  validatePlace,
  updatePlace
);
router.delete(
  '/:id',
  authUser,
  authAdmin,
  validateObjectId(),
  deletePlace
);

module.exports = router;