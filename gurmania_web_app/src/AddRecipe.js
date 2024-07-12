import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './logo.png';
import CurrentYear from './CurrentYear';
import {Helmet} from 'react-helmet';

function AddRecipe({ token, setToken }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

	const handleLogout = () => {
		setToken('');
		localStorage.removeItem('token');
		localStorage.removeItem('username');
    setUsername('');
	};
	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
			const storedUsername = localStorage.getItem('username');
			if (storedUsername) {
			  setUsername(storedUsername);
			}
		  } else {
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			setUsername('');
		  }
	}, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
      setError('Сложность должна быть числом от 1 до 5.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('difficulty', difficulty);
    formData.append('cookingTime', cookingTime);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:7777/recipes',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Ура! Рецепт добавлен!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      setDifficulty('');
      setCookingTime('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Ой-ой! Ошибка сервера...');
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Добавление рецепта</title>
      </Helmet>
      <header>
        <div class="container">
        <div className = "logo">
          <a href = "/">
          <img src = {logo} alt="Логотип" className="logo"></img>
          </a>
        </div>
            <nav>
                <ul class="nav-links">
                    <Link to="/">ГЛАВНАЯ</Link>
                    <Link to="/news">НОВОСТИ</Link>
                    <Link to="/recipes">РЕЦЕПТЫ</Link>
                </ul>
            </nav>
            <div class="login">
            {token ? (
              <><span className = "username">Привет, {username}!</span>
              <button className='login-btn' onClick={handleLogout}><b>ВЫЙТИ</b></button></>
            ) : (
            <Link to="/login">
                <button class="login-btn"><b>ВХОД / РЕГИСТРАЦИЯ</b></button>
            </Link>
            )}
            </div>
        </div>
    </header>
        <div align='center'>
        <form onSubmit={handleSubmit} className = "recipe-form" method="post" encType="multipart/form-data">
        <h2>Добавление рецепта</h2>
          {error && <p>{error}</p>}
          <br></br>
          <div>
            <label>Название блюда*:  </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Ингредиенты*:  </label>
            <textarea onChange={(e) => setIngredients(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Шаги*:  </label>
            <textarea onChange={(e) => setInstructions(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Сложность по шкале от 1 до 5*:  </label>
            <input type="number" min = "1" max = "5" onChange={(e) => setDifficulty(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Время приготовления*:  </label>
            <textarea onChange={(e) => setCookingTime(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Описание*:  </label>
            <textarea onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Изображение*:  </label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
          </div>
          <br></br>
          <button className="login-btn" type="submit"><b>ДОБАВИТЬ РЕЦЕПТ</b></button>
        </form>
        </div>

      <footer className="footer">
        <div className = "qa">
          <h4>Остались вопросы? Пишите нам!</h4>
          <div className = "mail-to">
          <p><a href="mailto:feedback@gurmania.ru">feedback@gurmania.ru</a></p>
          </div>
        </div>
        <p> <CurrentYear />  |  <Link to="/policy">Политика конфиденциальности</Link> | </p>
      </footer>
    </div>
  );
} 

export default AddRecipe;