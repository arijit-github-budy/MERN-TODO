import AuthAxios from '../../../../utils/axios.utils';
import { TODO_LISTS, SET_EDIT_TODO } from './todo.types';
import { toast } from 'react-toastify';
import moment  from 'moment';

export const getUserTodoLists = (current_page, pageLimit) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            const currentPage = current_page || getState().todo.todo_current_page;
            const offset = (currentPage - 1) * pageLimit;

            const response = await AuthAxios.get(`/user/todo/todos?offset=${offset}&limit=${pageLimit}`);
            const { status, message, all_todos, total_todo } = response.data;

            if (status && String(status).toLowerCase() === "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() === "success") {
                let formated_todos = all_todos.map((todo) => {
                    let temp_date = todo.created_date ? moment(todo.created_date).format('YYYY-MM-DD') : todo.created_date;
                    todo.created_date = temp_date ? temp_date : todo.created_date;
                    return todo
                })
                dispatch({
                    type: TODO_LISTS,
                    payload: {
                        all_todos: formated_todos,
                        total_todo,
                        lastTodo: currentPage,
                        todo_limit: pageLimit
                    }
                });
            }

        } catch (error) {
            console.error("Error fetching user todos:", error);
            toast.error("Failed to fetch todos. Please try again.");
        }
    };
};


export const createUserTodo = (todo_data, clearForm) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            let response = await AuthAxios.post(`/user/todo/create`, todo_data);
            const { status, message, new_todo } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                clearForm();
                dispatch(getUserTodoLists(0,todo_limit));
            }

        } catch (error) {
            console.log("Error came from creating user todo", error);
            toast.error("Failed to create todo. Please try again.")
        }
    }
}

export const searchUserTodo = (current_page, pageLimit, search) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            const currentPage = current_page || getState().todo.todo_current_page;
            const offset = (currentPage - 1) * pageLimit;

            let response = await AuthAxios.get(`/user/todo/search?search=${search}&offset=${offset}&limit=${pageLimit}`);
            const { status, message, todos, total_todo } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                let formated_todos = todos.map((todo) => {
                    let temp_date = todo.created_date ? moment(todo.created_date).format('YYYY-MM-DD') : todo.created_date;
                    todo.created_date = temp_date ? temp_date : todo.created_date;
                    return todo
                })
                dispatch({
                    type: TODO_LISTS,
                    payload: {
                        all_todos: formated_todos,
                        total_todo,
                        lastTodo: currentPage,
                        todo_limit: pageLimit
                    }
                });
            }

        } catch (error) {
            console.log("Error came from searching user todo", error);
            toast.error("Failed to search todo. Please try again.")
        }
    }
}

export const updateTodoStaus = (todo_id, data) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            let response = await AuthAxios.patch(`/user/todo/update/status/${todo_id}`, data);
            const { status, message } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                dispatch(getUserTodoLists(0, todo_limit));
            }

        } catch (error) {
            console.log("Error came from upadating user todo status", error);
            toast.error("Failed to update todo status. Please try again.")
        }
    }
}

export const getTodoForEdit = (edit_todo, todo_action) => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_EDIT_TODO,
            payload: {
                edit_todo,
                todo_action
            }
        })
    }
}

export const editUserTodo = (todo_id, todo_data, clearForm) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            let response = await AuthAxios.patch(`/user/todo/update/${todo_id}`, todo_data);
            const { status, message, todo } = response.data

            if (status && status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && status && String(status).toLowerCase() == "success") {
                clearForm();
                toast.success(message);
                dispatch(getUserTodoLists(0, todo_limit));
                setTimeout(() => {
                    dispatch(getTodoForEdit({}, ''));
                }, 800)
            }

        } catch (error) {
            console.log("Error came from updating user todo", error);
            toast.error("Failed to update todo. Please try again.")
        }
    }
}

export const deleteUserTodo = (todo_id) => {
    return async (dispatch, getState) => {
        try {
            const { todo_limit } = getState().todo;
            let response = await AuthAxios.delete(`/user/todo/delete/${todo_id}`);
            const { status, message, new_todo } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                dispatch(getUserTodoLists(0, todo_limit));
            }

        } catch (error) {
            console.log("Error came from deleting user todo", error);
            toast.error("Failed to delete todo. Please try again.")
        }
    }
}