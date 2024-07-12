const express = require('express');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const router = express.Router();


// Получение всех рецептов
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Маршрут для получения количества рецептов
router.get('/count', async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error); // Логирование ошибки на сервере
    res.status(500).json({ error: 'Ошибка при получении количества рецептов' });
  }
});

// Получение деталей рецепта
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Рецепт не найден');
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление нового рецепта
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, ingredients, instructions, description, cookingTime, difficulty } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image URL to be saved:', imageUrl);
    const recipe = new Recipe({ title, ingredients, instructions, user: req.user, username: user.username, difficulty, cookingTime, description, imageUrl });
    console.log('Uploaded file path:', imageUrl); // Отладочный вывод
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;