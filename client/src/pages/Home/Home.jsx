import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from '../../components/Todo Form/TodoForm';
import TodoTable from '../../components/Todo Table/TodoTable';
import styles from './home.module.css';
import * as actions from '../../global/states/reducers/todo/todo.actions.js';

const Dashboard = () => {
    const dispatch = useDispatch();

    const todosState = useSelector((state) => state.todo);

    const {todo_current_page, todo_limit} = todosState;

    useEffect(() => {
        dispatch(actions.getUserTodoLists(todo_current_page, todo_limit));
    }, []);

    return (
        <div>
            <div className={styles.dashboardContainer}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.title}>Add Todo</h2>
                    <TodoForm />
                </div>
                <div className={styles.rightPanel}>
                    <h2 className={styles.title}>Todo List</h2>
                    <TodoTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
