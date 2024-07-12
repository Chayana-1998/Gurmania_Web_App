import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function Login({ setToken }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7777/auth/login', { username, password });
      const { token, userId } = response.data;
      setToken(token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username); // Сохраняем username в локальное хранилище
      navigate('/recipes');
    } catch (error) {
      console.error('Error during login', error);
      setError('Неправильный логин или пароль. Попробуйте еще раз');
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Вход</title>
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
                <button class="login-btn"><b>ВХОД / РЕГИСТРАЦИЯ</b></button>
            </div>
        </div>
    </header>
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 align="center">Вход</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    className="login-input"
                    type="text"
                    required
                    placeholder="Ник"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">Войти</button>
                <p>Еще не с нами? <Link to="/register">Зарегистрируйтесь!</Link></p>
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

export default Login;