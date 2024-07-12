import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ recipeId, token }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:7777/comments/${recipeId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [recipeId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:7777/comments/${recipeId}/comments`, { text: newComment }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(response.data.comments);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="comments-section">
            {token ? (
                <><div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                    />
                    <button align = "right" className = "login-btn" onClick={handleAddComment}>Отправить</button>
                </div></>
            ) : (
                <><br></br>
                <p align = "center">Только зарегистрированные пользователи могут оставлять комментарии.</p></>
            )}
            <br></br>

            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <b>{comment.username}</b>
                        <p>{comment.text}</p>
                        <p className="commentDate">{new Date(comment.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
