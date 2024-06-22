import React, { useState } from 'react';
import styles from './TodoTable.module.css'; // Import TodoTable module CSS

const TodoTable = ({ todos, toggleCompletion, deleteTodo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(5); // State for todos per page

    // Function to handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle page limit change
    const handlePageLimitChange = (e) => {
        setTodosPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when page limit changes
    };

    // Filter todos based on search term
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logic to paginate todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic to calculate total pages
    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

    // Function to handle previous page click
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle next page click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.todoTable}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search Todos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} type='button' onClick={handlePreviousPage}>Search</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTodos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button onClick={() => toggleCompletion(todo.id)}>
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <span className={styles.pageLimit}>
                    Items per page:
                    <select value={todosPerPage} onChange={handlePageLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </span>
                <div className={styles.pageActions}>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <div>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoTable;
