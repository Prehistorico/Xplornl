const Category = require('../models/Category');

const {
  isNonEmptyString,
  isValidObjectId
} = require('./valdateInputs');

const validatePlace = async (req, res, next) => {
  try {
    const {
      name,
      category,
      location,
      contact
    } = req.body;

    if (name !== undefined) {
      if (!isNonEmptyString(name, 3)) {
        return res.status(400).json({
          message: 'Nombre inválido'
        });
      }
    }

    if (category !== undefined) {

      if (!isValidObjectId(category)) {
        return res.status(400).json({
          message: 'Category ID inválido'
        });
      }

      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          message: 'Categoría no existe'
        });
      }
    }

    if (location?.coordinates) {

      const { lat, lng } = location.coordinates;

      if (
        typeof lat !== 'number' ||
        typeof lng !== 'number'
      ) {
        return res.status(400).json({
          message: 'Coordenadas inválidas'
        });
      }

      if (
        lat < -90 || lat > 90 ||
        lng < -180 || lng > 180
      ) {
        return res.status(400).json({
          message: 'Coordenadas fuera de rango'
        });
      }
    }

    if (contact?.website) {

      const websiteRegex = /^https?:\/\/.+/;

      if (!websiteRegex.test(contact.website)) {
        return res.status(400).json({
          message: 'Website inválido'
        });
      }
    }

    if (contact?.phone) {

      const phoneRegex = /^[0-9+\-\s()]+$/;

      if (!phoneRegex.test(contact.phone)) {
        return res.status(400).json({
          message: 'Teléfono inválido'
        });
      }
    }

    next();

  } catch (error) {
    next(error);
  }
};

module.exports = validatePlace;