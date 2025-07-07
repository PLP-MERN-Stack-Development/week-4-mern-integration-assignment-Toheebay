const Category = require('../models/Category');

// GET /api/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// POST /api/categories
exports.createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('Error creating category:', err.message);
    res.status(500).json({ message: 'Failed to create category' });
  }
};
