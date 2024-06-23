import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoForm.module.css'; // Import CSS module
import { toast } from 'react-toastify';
import * as actions from '../../global/states/reducers/todo/todo.actions.js';

const default_form = {
    title: '',
    description: ''
}

const TodoForm = () => {
    const dispatch = useDispatch();

    const todoState = useSelector((state) => state.todo);

    const { edit_todo, todo_action } = todoState;

    const [todoForm, setTodoForm] = useState(default_form);

    useEffect(() => {
        if (edit_todo) {
            console.log("my too", edit_todo)
            let todoData = {
                title: edit_todo.title,
                description: edit_todo.description
            };

            setTodoForm(todoData);
        }
    }, [edit_todo, todo_action]);

    const clearForm = () => {
        console.log("i am here")
        setTodoForm(default_form);
    }

    const handleInputForm = (e) => {
        e.preventDefault();
        setTodoForm({ ...todoForm, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!todoForm.title || !todoForm.description) {
            toast.error("Please all the fields");
            return;
        }
        if(todo_action && String(todo_action).toLowerCase() == 'update'){
            console.log("updated todo", todoForm);
            dispatch(actions.editUserTodo(edit_todo.todo_id, todoForm, clearForm))
        }else{
            dispatch(actions.createUserTodo(todoForm, clearForm));
        }
    }

    return (
        <div className={styles.todoForm}>
            <input
                type="text"
                placeholder="Title"
                name='title'
                value={todoForm.title}
                onChange={(e) => handleInputForm(e)}
                className={styles.input}
                required
            />
            <textarea
                placeholder="Description"
                name='description'
                value={todoForm.description}
                onChange={(e) => handleInputForm(e)}
                className={styles.input}
                rows="5"
                required
            />
            <button type="button" className={styles.submitButton} onClick={(e) => handleFormSubmit(e)} disabled={!todoForm.title || !todoForm.description}> {String(todo_action).toLowerCase() == 'update' ? 'Update' : 'Add'}  Todo</button>
        </div>
    );
};

export default TodoForm;
