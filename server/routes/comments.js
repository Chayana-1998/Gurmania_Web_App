const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Добавление комментария к рецепту
router.post('/:recipeId/comments', auth, async (req, res) => {
    const { recipeId } = req.params;
    const { text } = req.body;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            console.log('Recipe not found');
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        console.log('Recipe found:', recipe);
        console.log('User ID from auth middleware:', req.user);

        const user = await User.findById(req.user); // Извлекаем пользователя по ID
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user);

        const comment = {
            user: req.user._id,
            username: user.username,
            text: text,
            date: new Date()
        };

        recipe.comments.unshift(comment);
        await recipe.save();

        res.status(201).json(recipe);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: err.message });
    }
});

// Получение всех комментариев к рецепту
router.get('/:recipeId/comments', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const recipe = await Recipe.findById(recipeId).populate({
            path: 'comments.user',
            select: 'username'  // Только поле username
        });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe.comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
