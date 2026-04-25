const Place = require('../models/Place');

exports.createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);

    await place.save();

    res.status(201).json({
      message: 'Lugar creado',
      place
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear lugar' });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find()
      .populate('category', 'name');

    res.json(places);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener lugares' });
  }
};

exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('category', 'name');

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json(place);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener lugar' });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json({
      message: 'Lugar actualizado',
      place
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar lugar' });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.json({ message: 'Lugar eliminado' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar lugar' });
  }
};