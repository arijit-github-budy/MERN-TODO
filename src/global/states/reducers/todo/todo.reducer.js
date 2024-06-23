import { SET_EDIT_TODO, TODO_LISTS } from './todo.types';

const INITIAL_STATE = {
    todos: [],
    total_todo: 0,
    edit_todo: {},
    todo_action: '',
    total_todo: 0,
    todo_limit: 5,
    todo_current_page: 1
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_LISTS:
            return {
                ...state, 
                todos: action.payload.all_todos,
                total_todo: action.payload.total_todo,
                todo_current_page: action.payload.lastTodo,
                todo_limit: action.payload.todo_limit
            };
        
            case SET_EDIT_TODO:
            return {
                ...state, 
                edit_todo: action.payload.edit_todo,
                todo_action: action.payload.todo_action
            };
        default: return state;
    }
};

export default reducer;