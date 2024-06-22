import React, { useState } from 'react';
import styles from './TodoForm.module.css'; // Import CSS module

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        
        // Generate unique ID (for demo, you can use uuid library for real projects)
        const id = new Date().getTime();
        const newTodo = { id, title, description, completed: false };
        
        addTodo(newTodo);
        setTitle('');
        setDescription('');
    };

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.input}
                rows="5"
                required
            />
            <button type="submit" className={styles.submitButton}>Add Todo</button>
        </form>
    );
};

export default TodoForm;
