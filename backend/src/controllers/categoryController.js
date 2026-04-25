const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      message: 'Categoría creada',
      category
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({
      message: 'Categoría actualizada',
      category
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
};