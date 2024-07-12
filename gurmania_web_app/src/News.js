import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Импорт Axios для HTTP-запросов
import {Link} from 'react-router-dom';
import logo from './logo.png';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function News({ token, setToken }) {

  const [username, setUsername] = useState('');
  const [news, setNews] = useState([]); // Состояние для хранения новостей

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

  useEffect(() => {
    // Получение новостей с сервера
    axios.get('http://localhost:7777/news')
        .then(response => {
            console.log(response.data); // Добавьте это, чтобы проверить данные
            setNews(response.data);
        })
        .catch(error => {
            console.error('Ошибка при загрузке новостей:', error);
        });
}, []);

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Новости</title>
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
                    <Link to="">НОВОСТИ</Link>
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
    <div className="content">
        <h1 align="center">Новости</h1>
        <p align="center">Найдено — {news.length}</p>
        <ul className="news-list">
          {news.map((item, index) => (
            <li className="news-item" key={index}>
                <div className="news-content">
                  <Link to={`/news/${item._id}`} className="news-link">
                    <h2 align="center"><b>{item.title}</b></h2>
                  </Link>
                  <p><em>{item.author}</em></p>
                  <p><em>{new Date(item.createdAt).toLocaleDateString()}</em></p>
                </div>
            </li>
          ))}
        </ul>
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

export default News;