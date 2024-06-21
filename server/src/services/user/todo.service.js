import UserModel from "../../Models/user/user.model.js";
import FormValidation from "../../validators/form.validator.js";

class TodoService {
    constructor() { }
    static Todo = UserModel.TodoModel();
    
    static async CreateTodoService(bodyData) {
        const formValResponse = await FormValidation.TodoFormValidate(bodyData);

        if (formValResponse.status == "error") {
            return formValResponse;
        }

        const { title, description } = bodyData;

        let new_todo = await this.Todo.create({
            title,
            description,
            status: 'Pending'
        });

        if (!new_todo) {
            return {
                status: "error",
                code: 500,
                message: "Todo creation failed",
            }
        }

        new_todo = new_todo.toJSON();


        delete new_todo.__v;

        return {
            status: "success",
            code: 201,
            message: "Todo has been created successfully",
            new_todo
        }
    }

    static async SearchTodoService(query) {

        let { search, offset, limit } = query;

        offset = Number(offset) ? offset : 0;
        limit = Number(limit) ? limit : 5;

        let searched_todos = [];

        if(!search){
            searched_todos = await this.Todo.find({}).select({ _id: 0, __v: 0 });
        }

        searched_todos = await this.Todo.find({
            $or: [
                { title: {$regex: search, $options: 'i'} },
                { status: {$regex: search, $options: 'i'} },
            ]
        }).skip(offset).limit(limit).select({ _id: 0, __v: 0 });

        if (searched_todos.length == 0) {
            return {
                status: "error",
                code: 404,
                message: "Todos not found.",
                todo: []
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todo has been fetched successfully",
            todo: searched_todos
        }
    }

    static async GetAllTodosService(query) {

        let { offset, limit } = query;
        let all_todos = [];

        offset = Number(offset) ? offset : 0;
        limit = Number(limit) ? limit : 5;

        all_todos = await this.Todo.find({}).skip(offset).limit(limit).select({ _id: 0, __v: 0 });


        if (!all_todos) {
            return {
                status: "error",
                code: 500,
                message: "Failed to fetch all todos",
            }
        }

        if (all_todos.length == 0) {
            return {
                status: "error",
                code: 500,
                message: "No todos found.",
                all_todos: []
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todos have been fetched successfully",
            all_todos
        }
    }
    
    static async GetSingleTodoService(params) {

        let { todoId } = params;

        if (!todoId) {
            return {
                status: "error",
                code: 400,
                message: "Todo id is required to fetch particular todo.",
            }
        }

        let fetched_todo = await this.Todo.findOne({
            todo_id: todoId
        }).select({ _id: 0, __v: 0 });

        if (!fetched_todo) {
            return {
                status: "error",
                code: 404,
                message: "Todo is not found"
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todo has been fetched successfully",
            todo: fetched_todo
        }
    }

    static async UpdateSingleTodoService(params, bodyData) {

        let { todoId } = params;
        let { title, description } = bodyData;

        if(title == ''){
            return {
                status: "error",
                code: 400,
                message: "Title cannot be empty.",
            }
        }

        if(description == ''){
            return {
                status: "error",
                code: 400,
                message: "Description cannot be empty.",
            }
        }


        if (!todoId) {
            return {
                status: "error",
                code: 400,
                message: "Todo id is required to update particular todo.",
            }
        }

        const found_todo = await this.GetSingleTodoService(params);

        if(found_todo.status == 'error' || found_todo.code == 404){
            return {
                status: "error",
                code: 400,
                message: "Invalid todo.",
            }
        }

        let updated_todo = await this.Todo.findOneAndUpdate({
            todo_id: todoId
        }, {
            $set: {
                title,
                description
            }
        }, {
            new: true
        }).select({ _id: 0, __v: 0 });

        if (!updated_todo) {
            return {
                status: "error",
                code: 404,
                message: "Todo is not update",
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todo has been updated successfully",
            todo: updated_todo
        }
    }

    static async UpdateSingleTodoStatusService(params, bodyData) {

        let { todoId } = params;
        let { status } = bodyData;

        if (!todoId) {
            return {
                status: "error",
                code: 400,
                message: "Todo id is required to update status of todo.",
            }
        }

        if(!['completed', 'pending'].includes(String(status).trim().toLowerCase())){
            return {
                status: "error",
                code: 400,
                message: "Status must be either pending or completed.",
            }
        }

        const found_todo = await this.GetSingleTodoService(params);

        if(found_todo.status == 'error' || found_todo.code == 404){
            return {
                status: "error",
                code: 400,
                message: "Invalid todo.",
            }
        }

        status = String(status).charAt(0).toUpperCase() + String(status).substring(1);

        let updated_todo = await this.Todo.findOneAndUpdate({
            todo_id: todoId
        }, {
            $set: {
                status
            }
        }, {
            new: true
        }).select({ _id: 0, __v: 0 });

        if (!updated_todo) {
            return {
                status: "error",
                code: 404,
                message: "Todo status is not update",
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todo status has been updated successfully",
            todo: updated_todo
        }
    }
    
    static async DeleteSingleTodoService(params) {

        let { todoId } = params;

        if (!todoId) {
            return {
                status: "error",
                code: 400,
                message: "Todo id is required to delete particular todo.",
            }
        }

        const found_todo = await this.GetSingleTodoService(params);

        if(found_todo.status == 'error' || found_todo.code == 404){
            return {
                status: "error",
                code: 400,
                message: "Invalid todo.",
            }
        }

        let deleted_todo = await this.Todo.findOneAndRemove({
            todo_id: todoId
        }, {
            new: true
        }).select({ _id: 0, __v: 0 });

        if (!deleted_todo) {
            return {
                status: "error",
                code: 404,
                message: "Todo is not delete",
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Todo has been deleted successfully",
            todo: deleted_todo
        }
    }
}

export default TodoService;