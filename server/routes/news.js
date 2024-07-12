const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');

// Создание новости
router.post('/', auth, async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).send(news);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получение всех новостей
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.send(news);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const newsItem = await News.findById(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ message: 'Новость не найдена' });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

// Обновление новости
router.put('/:id', auth, async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!news) {
            return res.status(404).send();
        }
        res.send(news);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удаление новости
router.delete('/:id', auth, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).send();
        }
        res.send(news);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

