const Place = require('../models/Place');
const Category = require('../models/Category');
const pickPlaceFields = require('../utils/pickPlaceFields');

const { isNonEmptyString, isValidObjectId } = require('../validators/validateInputs');
const appError = require('../utils/appError');

exports.createPlace = async (req, res, next) => {
  try {

    const placeData = pickPlaceFields(req.body);

    const place = new Place(placeData);

    await place.save();

    res.status(201).json({
      message: 'Lugar creado',
      place
    });

  } catch (error) {
    next(error);
  }
};
exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find()
      .populate('category', 'name');

    res.json(places);

  } catch (error) {
       next(error);
  }
};
exports.getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('category', 'name');

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json(place);

  } catch (error) {
    next(error);
  }
};
exports.updatePlace = async (req, res, next) => {

  try {

    const updates = pickPlaceFields(req.body);

    const place = await Place.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!place) {
      return res.status(404).json({
        message: 'Lugar no encontrado'
      });
    }

    res.json({
      message: 'Lugar actualizado',
      place
    });

  } catch (error) {
    next(error);
  }
};
exports.deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json({ message: 'Lugar eliminado' });

  } catch (error) {
     next(error);
  }
};