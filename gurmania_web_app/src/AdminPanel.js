import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = ({token}) => {
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        axios.get('/news')
            .then(response => setNews(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Проверка на наличие токена
        if (!token) {
            alert('Вы не авторизованы');
            return;
        }

        axios.post('/news', { title, content, author }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setNews([...news, response.data]);
                setTitle('');
                setContent('');
                setAuthor('');
            })
            .catch(error => console.error('Ошибка при добавлении новости:', error));
    };

    return (
        <div>
            <h1>Панель администратора</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Содержание"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button type="submit">Добавить</button>
            </form>
            <ul>
                {news.map(n => (
                    <li key={n._id}>
                        <h2>{n.title}</h2>
                        <p>{n.content}</p>
                        <p>{n.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;