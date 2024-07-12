import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import News from './News';
import Recipes from './Recipes';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import PrivacyPolicy from './PrivacyPolicy'
import AddRecipe from './AddRecipe';
import RecipeDetails from './RecipeDetails';
import NotFound from './NotFound';
import AdminPanel from './AdminPanel';
import NewsDetail from './NewsDetail';

const Main = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // Функция для выхода из системы
  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  // Сохраняем токен в локальное хранилище при его изменении
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App token={token} Home username={username} setToken={setToken} />} />
        <Route path="/news" element={<News token={token} setToken={setToken} username={username} />} />
        <Route path="/recipes" element={<Recipes token={token} setToken={setToken} userId={userId} username={username} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policy" element={<PrivacyPolicy token={token} username={username} setToken={setToken} />} />
        <Route path="/new_recipe" element={<ProtectedRoute token={token}><AddRecipe token={token} setToken={setToken} /></ProtectedRoute>} />
        <Route path="/recipes/:id" element={<RecipeDetails token={token} setToken={setToken} username={username}/>} />
        <Route path="*" element={<NotFound token={token} setToken={setToken} username={username}/>} />
        <Route path="/admin" element={<AdminPanel token={token} setToken={setToken} username={username}/>} />
        <Route path="/news/:id" element={<NewsDetail token = {token} setToken={setToken} username={username}/>} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
