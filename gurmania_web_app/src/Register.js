import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './logo.png';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация длины пароля
    if (password.length < 6) {
      setError('Пароль должен быть длиной от 6 символов и больше.');
      return;
    }

    try {
      await axios.post('http://localhost:7777/auth/register', { username, password });
      setError('');
      alert('Регистрация прошла успешно!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Ой-ой! Что-то пошло не так... Попробуйте позже');
      }
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Регистрация</title>
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
                <h2 align="center">Регистрация</h2>
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
                <button type="submit" className="login-btn">Зарегистрироваться!</button>
                <p>Уже есть аккаунт? <Link to="/login">Смелее входите!</Link></p>
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

export default Register;