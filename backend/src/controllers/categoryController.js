const Category = require('../models/Category');

const { isNonEmptyString } = require('../utils/validators');
const appError = require('../utils/appError');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!isNonEmptyString(name, 3)) {
      return res.status(400).json({ message: 'Nombre inválido (mínimo 3 caracteres)' });
    }

    const category = new Category({
      name: name.trim()
    });

    await category.save();

    res.status(201).json({
      message: 'Categoría creada',
      category
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

   next(error);
  }
};
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json(categories);

  } catch (error) {
    next(error);
  }
};
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);

  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name && !isNonEmptyString(name, 3)) {
      return res.status(400).json({ message: 'Nombre inválido' });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: name?.trim() },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría actualizada', category });

  } catch (error) {
    next(error);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada' });

  } catch (error) {
    next(error);
  }
};