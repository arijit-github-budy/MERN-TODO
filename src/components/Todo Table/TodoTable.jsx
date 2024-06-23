import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, CircleCheck } from 'lucide-react';
import styles from './TodoTable.module.css'; // Import TodoTable module CSS
import { toast } from 'react-toastify';
import * as actions from '../../global/states/reducers/todo/todo.actions.js';

const TodoTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todoState = useSelector((state) => state.todo);
    const { todos: all_todos, todo_limit, total_todo, todo_current_page } = todoState;
    const [searchTerm, setSearchTerm] = useState('');

    // Handlers for pagination
    const handlePreviousPage = () => {
        if (todo_current_page > 1) {
            const currentPage = todo_current_page - 1;
            if (searchTerm) {
                dispatch(actions.searchUserTodo(currentPage, todo_limit, searchTerm));
                return;
            }
            dispatch(actions.getUserTodoLists(currentPage, todo_limit));
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(total_todo / todo_limit);
        if (todo_current_page < totalPages) {
            const currentPage = todo_current_page + 1;
            if (searchTerm) {
                dispatch(actions.searchUserTodo(currentPage, todo_limit, searchTerm));
                return
            }
            dispatch(actions.getUserTodoLists(currentPage, todo_limit));
        }
    };

    const handleSearchInput = (e) => {
        e.preventDefault();
        if (!e.target.value) {
            setSearchTerm('');
            dispatch(actions.getUserTodoLists());
            return;
        }
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        if (!searchTerm) {
            toast.error("Please input search text.");
            return;
        }
        dispatch(actions.searchUserTodo(todo_current_page, todo_limit, searchTerm));
    };

    const handleEditTodo = (todo) => {
        if (!todo) {
            toast.error("Invalid todo found for edit.");
            return;
        }
        dispatch(actions.getTodoForEdit(todo, 'update'));
    };

    const handleViewTodo = (todo_id) => {
        if (!todo_id) {
            toast.error("Invalid todo found for view.");
            return;
        }
        navigate(`/auth/user/todo/${todo_id}`, { replace: true });
    };

    const handleDeleteTodo = (todo_id) => {
        if (!todo_id) {
            toast.error("Invalid todo id found to delete.");
            return;
        }
        dispatch(actions.deleteUserTodo(todo_id));
    };

    const handleTodoStatus = (todo_id) => {
        if (!todo_id) {
            toast.error("Invalid todo id found to update status.");
            return;
        }
        let todo_status = {
            status: 'completed'
        }
        dispatch(actions.updateTodoStaus(todo_id, todo_status));
    }

    return (
        <div className={styles.todoTable}>
            {/* Search input */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search Todos"
                    value={searchTerm}
                    onChange={(e) => handleSearchInput(e)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} type='button' onClick={(e) => handleSearch(e)} disabled={!searchTerm}>Search</button>
            </div>

            {/* Todo table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: "252px" }}>Title</th>
                        <th>Description</th>
                        <th style={{ width: "120px" }}>Date</th>
                        <th style={{ width: "120px" }}>Status</th>
                        <th style={{ width: "205px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {all_todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>
                                <Link className={styles.titleLink} to={`/auth/user/todo/${todo.todo_id}`}>
                                    {todo.title}
                                </Link>
                            </td>
                            <td>{todo.description && todo.description.length > 20 ? `${todo.description.slice(0, 100)}...` : todo.description}</td>
                            <td>
                                {todo.created_date}
                            </td>
                            <td>
                                <div className={`${styles.todoStatus} ${String(todo.status).toLowerCase() === 'completed' ? styles.todoCompleteColor : styles.todoPendingColor}`}>
                                    {todo.status}
                                </div>
                            </td>
                            <td>
                                <div className={String(todo.status).toLowerCase() === 'completed' ? styles.tableActionViewIcons : styles.tableActionIcons}>
                                    {String(todo.status).toLowerCase() === 'completed' ?
                                        <>
                                            <span className={`${styles.icon} ${styles.eye}`} onClick={() => handleViewTodo(todo.todo_id)}>
                                                <Eye />
                                            </span>
                                            <span className={`${styles.icon} ${styles.trash}`} onClick={() => handleDeleteTodo(todo.todo_id)}>
                                                <Trash2 />
                                            </span>
                                        </>
                                        :
                                        <>
                                            <span className={`${styles.icon} ${styles.circle}`} onClick={() => handleTodoStatus(todo.todo_id)}>
                                                <CircleCheck />
                                            </span>
                                            <span className={`${styles.icon} ${styles.eye}`} onClick={() => handleViewTodo(todo.todo_id)}>
                                                <Eye />
                                            </span>
                                            <span className={`${styles.icon} ${styles.pencil}`} onClick={() => handleEditTodo(todo)}>
                                                <Pencil />
                                            </span>
                                            <span className={`${styles.icon} ${styles.trash}`} onClick={() => handleDeleteTodo(todo.todo_id)}>
                                                <Trash2 />
                                            </span>
                                        </>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {all_todos.length > 0 &&
                <div className={styles.pagination}>
                    <div className={styles.pageActions}>
                        <button onClick={handlePreviousPage}>Previous</button>
                        <button onClick={handleNextPage}>Next</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default TodoTable;
