import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../../components/Todo Form/TodoForm';
import TodoTable from '../../components/Todo Table/TodoTable';
import styles from './home.module.css';

const Dashboard = () => {
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);
    console.log("dashborad state", authState);

    const {user} = authState;

    const [todos, setTodos] = useState([
        { id: 1, title: 'Todo 1', description: 'Description for Todo 1', status: "Pending", completed: false },
        { id: 2, title: 'Todo 2', description: 'Description for Todo 2', status: "Completed", completed: true },
        { id: 3, title: 'Todo 3', description: 'Description for Todo 3', status: "Pending", completed: false },
        // Add more todos as needed
    ]);

    // Function to add new todo
    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    // Function to toggle todo completion status
    const toggleCompletion = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // Function to delete todo
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <div className={styles.dashboardContainer}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.title}>Add Todo</h2>
                    <TodoForm addTodo={addTodo} />
                </div>
                <div className={styles.rightPanel}>
                    <h2 className={styles.title}>Todo List</h2>
                    <TodoTable todos={todos} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
