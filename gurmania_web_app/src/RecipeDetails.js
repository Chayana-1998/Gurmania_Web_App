import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {useParams, Link, useNavigate} from 'react-router-dom';
import logo from './logo.png';
import Comments from './Comments';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function RecipeDetails({ token, setToken }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:7777/recipes/${id}`);
      setRecipe(response.data);
    };

    fetchRecipe();
  }, [id]);

	const handleLogout = () => {
		setToken('');
		localStorage.removeItem('token');
    localStorage.removeItem('userId');
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

  if (!recipe) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="App">
      <Helmet>
        <title>{recipe.title} — Гурмания</title>
      </Helmet>
      <header>
        <div className="container">
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
          <div className="recipe-details-container">
          <h1 className="recipe-title">{recipe.title}</h1>
          <div className="recipe-meta">
            <div>Автор: {recipe.username}</div>
            <div>Дата добавления: {new Date(recipe.dateAdded).toLocaleDateString()}</div>
            <div>Сложность: {recipe.difficulty}</div>
            <div>Время приготовления: {recipe.cookingTime}</div>
          </div>
          {recipe.imageUrl && <img src={`http://localhost:7777${recipe.imageUrl}`} className="recipe-detail-image" />}
          <br></br>
          <div className="menu2">
            <p>Содержание</p>
            <ol>
              <li><a href="#description">Описание</a></li>
              <li><a href="#ingredients">Ингредиенты</a></li>
              <li><a href="#instructions">Инструкции</a></li>
              <li><a href="#comments">Комментарии к рецепту</a></li>
              <br></br>
            </ol>
          </div>
          <h2 id="description">Описание</h2>
          <div className="recipe-description">
            <p align="left">{recipe.description}</p>
          </div>
          <div className="recipe-ingredients">
            <h2 id="ingredients">Ингредиенты</h2>
            <ul>
              {recipe.ingredients.split('\n').map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-instructions">
            <h2 id="instructions">Инструкции</h2>
            <ol>
              {recipe.instructions.split('\n').map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          <div className="recipe-comments">
            <h2 id="comments">Комментарии к рецепту</h2>
            <Comments recipeId={id} token={token} />
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

export default RecipeDetails;