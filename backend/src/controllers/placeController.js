const Place = require('../models/Place');
const Category = require('../models/Category');

const { isNonEmptyString, isValidObjectId } = require('../validators/validateInputs');
const appError = require('../utils/appError');

exports.createPlace = async (req, res, next) => {
  try {
    const { name, category, location } = req.body;

    if (!isNonEmptyString(name, 3)) {
      return res.status(400).json({ message: 'Nombre inválido' });
    }

    if (category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({ message: 'Category ID inválido' });
      }

      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Categoría no existe' });
      }
    }

    if (location?.coordinates) {
      const { lat, lng } = location.coordinates;

      if (
        typeof lat !== 'number' ||
        typeof lng !== 'number'
      ) {
        return res.status(400).json({ message: 'Coordenadas inválidas' });
      }
    }

    const place = new Place(req.body);

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
    const updates = req.body;

    if (updates.name && !isNonEmptyString(updates.name, 3)) {
      return res.status(400).json({ message: 'Nombre inválido' });
    }

    if (updates.category) {
      if (!isValidObjectId(updates.category)) {
        return res.status(400).json({ message: 'Category inválido' });
      }
    }

    const place = await Place.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json({ message: 'Lugar actualizado', place });

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