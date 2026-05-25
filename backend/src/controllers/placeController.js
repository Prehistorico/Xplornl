const Place = require('../models/Place');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const pickFields = require('../utils/pickFields');

exports.createPlace = catchAsync(async (req, res) => {
  const parseJSON = value => {
    try {return JSON.parse(value)} 
    catch {return value;}
  };

  const imagePaths = req.files?.map(file =>`/uploads/places/${file.filename}`) || [];

  const placeData = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    zone: req.body.zone,

    location: parseJSON(req.body.location),
    schedule: parseJSON(req.body.schedule),
    contact: parseJSON(req.body.contact),
    details: parseJSON(req.body.details),
    transport: parseJSON(req.body.transport),

    images: imagePaths
  };

  const place = await Place.create(placeData);
  res.status(201).json({
    message: 'Lugar creado',
    place
  });
});
exports.getPlaces = catchAsync(async (req, res) => {
    const places = await Place.find()
    .select('_id name description category zone images rating')
    .populate('category', 'name')
    .sort({ createdAt: -1 });

    res.json(places);
});
exports.getPlaceById = catchAsync(async (req, res, next) => {
    const place = await Place.findById(req.params.id)
    .populate('category', 'name');

    if (!place) {
      return next(
        new AppError( 'Lugar no encontrado', 404));
    }

    res.json(place);
});
exports.updatePlace = catchAsync(async (req, res, next) => {
    const updates = pickFields(req.body, [
      'name',
      'description',
      'category',
      'zone',
      'location',
      'schedule',
      'contact',
      'details',
      'transport'
    ]);

    const place = await Place.findByIdAndUpdate(
      req.params.id, 
      updates,
        {new: true,
        runValidators: true}
      )

        .populate('category', 'name');

    if (!place) {
      return next(
        new AppError('Lugar no encontrado', 404));}

    res.json({
      message: 'Lugar actualizado',
      place
    });
});
exports.deletePlace = catchAsync(async (req, res, next) => {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return next(
        new AppError('Lugar no encontrado', 404));
    }

    await place.deleteOne();

    res.json({
      message: 'Lugar eliminado'
    });
});