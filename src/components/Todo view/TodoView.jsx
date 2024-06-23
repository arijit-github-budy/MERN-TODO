import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import date-fns for date formatting
import styles from './todoView.module.css'; // Import CSS module

const TodoView = () => {
    const { todo_id } = useParams(); // Get todo_id from URL params
    const navigate = useNavigate();

    const todoState = useSelector((state) => state.todo);
    const { todos } = todoState;

    // Find the todo with the matching todo_id
    const todo = todos.find(todo => todo.todo_id == todo_id);

    if (!todo) {
        return (
            <div>
                <h1 className={styles.notFound}>Todo not found!</h1>
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.submitButton} onClick={() => navigate('/auth/dashboard', { replace: true })} > Go Back</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{todo.title}</h1>
            <p className={styles.description}>{todo.description}</p>
            <div className={styles.meta}>
                <div>
                    <p>Created By: {todo.created_by}</p>
                    <p>Created At: {moment(todo.created_at).format('DD/MM/YYYY HH:mm A')}</p>
                </div>
                <div className={`${styles.status} ${todo.status.toLowerCase() === 'completed' ? styles.completed : styles.pending}`}>
                    {todo.status}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button type="button" className={styles.submitButton} onClick={() => navigate('/auth/dashboard', { replace: true })} > Go Back</button>
            </div>
        </div>
    );
};

export default TodoView;
