const express = require('express');
const router = express.Router();

const roleMiddleware = require('../middleware/roleMiddleware');

const {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');

router.get('/', getPlaces);
router.get('/:id', getPlaceById);

router.post('/', roleMiddleware('admin'), createPlace);
router.put('/:id', roleMiddleware('admin'), updatePlace);
router.delete('/:id', roleMiddleware('admin'), deletePlace);

module.exports = router;