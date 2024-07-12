import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from './logo.png';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function Recipes({ token, setToken }) {

  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);

  const userId = localStorage.getItem('userId'); // Получаем userId из локального хранилища

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('http://localhost:7777/recipes');
      setRecipes(response.data);
    };

    // Функция для получения количества рецептов
    const fetchRecipeCount = async () => {
      const response = await fetch('http://localhost:7777/recipes/count'); // Убедитесь, что этот URL совпадает с вашим маршрутом
      const data = await response.json();
      setRecipeCount(data.count);
    };

    fetchRecipes();
    fetchRecipeCount(); // Вызов функции для получения количества рецептов
  }, []);

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

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Рецепты</title>
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
                    <Link to="">РЕЦЕПТЫ</Link>
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

      <div align="center" className="content">
			   <h1 align = "center">Рецепты</h1>
         <Link to="/new_recipe">
                <button className="login-btn"><b>ДОБАВИТЬ РЕЦЕПТ</b></button>
          </Link>
          <br></br>
          <br></br>
               <p align="center">Найдено — {recipeCount}</p>
          <br></br>
          <div className="recipe-grid">
            {recipes.map(recipe => (
                <div className="recipe-card" key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`} className="recipe-link">
                        <h1 className="recipe-title">{recipe.title}</h1>
                    </Link>
                    {recipe.imageUrl && <img src={`http://localhost:7777${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />}
                    <div className="recipe-info">
                        <p><strong>Автор:</strong> {recipe.username}</p>
                        <p><strong>Дата добавления:</strong> {new Date(recipe.dateAdded).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
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

export default Recipes;