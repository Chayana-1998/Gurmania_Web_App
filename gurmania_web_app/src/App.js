import React, { useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './logo.png';
import CarouselComponent from './CarouselComponent';
import CurrentYear from './CurrentYear';
import { Helmet } from 'react-helmet';

function App({ token, setToken }) {

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

  return (
    <div className="App">
      <Helmet>
        <title>Гурмания — Главная страница</title>
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

      <CarouselComponent />

      <div className="content">
			   <h1 align = "center">Мы рады приветствовать Вас в веб-приложении «Гурмания»!</h1>
			   <p>
				<div className="row">
			   <p align="center">Здесь вы сможете найти кулинарные рецепты, которые очень просты в приготовлении. Почерпните новые знания в сфере кулинарии;
			   узнайте простые способы приготовления блюд, которые кажутся сложными; соберите все любимые лакомства в одном месте, создав собственную кулинарную книгу;
			   найдите ответы на все интересующие вас вопросы всего за несколько кликов!</p>
			   <br></br>
			   <p align="center">В нашем банке вкусной еды находятся популярные пошаговые фоторецепты, помогающие точно
			   следовать специфике приготовления. Система поиска позволяет быстро, в любое удобное для вас время найти рецепт, который необходим именно вам.</p>
			   <br></br>
			   <p align="center">Готовка может быть простой и незатратной, праздничной, на скорую руку, с вашим непосредственным участием и без него. Однако одно остаётся неизменным — отменный вкус готового блюда. </p>
			   </div>
			   </p>
			   <p align = "center" id = "ratatui">
					<em><b>Наберитесь отваги, пробуйте, экспериментируйте. Не позволяйте никому загонять вас в рамки. Единственные ваши рамки — ваша душа. Это правда: готовить может каждый, но лишь бесстрашные достигают величия!</b></em>
			   </p>
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

export default App;