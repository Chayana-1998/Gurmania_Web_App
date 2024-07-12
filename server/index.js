const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const app = express();
connectDB();

// Проверка и создание директории 'uploads'
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/recipes', require('./routes/recipes'));
app.use('/comments', require('./routes/comments'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/news', require('./routes/news'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:universalURL", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).render('404'); // Отобразить шаблон 404
    } else {
      next(err); // Передать ошибку дальше
    }
  });
  

app.get("/", (req, res) => {
    res.send("Ку-ку!");
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log(`Сервер запущен. Порт: ${PORT}`));