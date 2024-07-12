import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import './App.css';
import logo from './logo.png';
import CurrentYear from './CurrentYear';

function NewsDetail({token, setToken}) {
  const { id } = useParams(); // Получение ID новости из URL
  const [newsItem, setNewsItem] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:7777/news/${id}`)
      .then(response => {
        setNewsItem(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке новости:', error);
      });
  }, [id]);

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

  if (!newsItem) {
    return <div>Загрузка...</div>;
  }

  const handleLogout = () => {
		setToken('');
		localStorage.removeItem('token');
    localStorage.removeItem('userId');
		localStorage.removeItem('username');
    setUsername('');
	};

  return (
    <div className = "App">
      <Helmet>
        <title>{newsItem.title} — Гурмания</title>
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
      <div className="news-detail">
        <h1 align="center">{newsItem.title}</h1>
        <p>{newsItem.content}</p>
        <p><em>{new Date(newsItem.createdAt).toLocaleDateString()}</em></p>
        <p><em>{newsItem.author}</em></p>
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

export default NewsDetail;
