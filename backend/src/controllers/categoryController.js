const Category = require('../models/Category');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res) => {
    const category = await Category.create({name: req.body.name});

    res.status(201).json({
      message: 'Categoría creada',
      category
    });
});
exports.getCategories = catchAsync(async (req, res) => {

    const categories =
      await Category.find()

        .sort({ name: 1 });

    res.json(categories);
});
exports.getCategoryById = catchAsync(async (req, res, next) => {
    const category =
      await Category.findById(req.params.id);

    if (!category) {
      return next(
        new AppError('Categoría no encontrada', 404));
    }

    res.json(category);
});
exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(
        new AppError(
          'Categoría no encontrada',
          404
        ));
    }

    if (req.body.name !== undefined) {
      category.name = req.body.name;
    }

    await category.save();

    res.json({
      message: 'Categoría actualizada',
      category
    });
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(
        new AppError(
          'Categoría no encontrada',
          404
        )
      );
    }

    await category.deleteOne();

    res.json({
      message: 'Categoría eliminada'
    });
});