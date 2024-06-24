import TodoService from "../../services/user/todo.service.js";

class TodoController{
    constructor(){}

    static async CreateTodo(req, res){
        try {
            let user_email = req.headers['email'];
            const bodyData = req.body;
            const response = await TodoService.CreateTodoService(user_email, bodyData);
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Todo creation failed.",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async SearchTodo(req, res){
        try {
            let user_email = req.headers['email'];
            const query = req.query;
            const response = await TodoService.SearchTodoService(user_email,query);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to search todo",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async GetAllTodos(req, res){
        try {
            let user_email = req.headers['email'];
            const query = req.query;
            const response = await TodoService.GetAllTodosService(user_email,query);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to fetch all todos.",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async GetSingleTodo(req, res){
        try {
            const params = req.params;
            const response = await TodoService.GetSingleTodoService(params);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to fetch todo",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async UpdateSingleTodo(req, res){
        try {
            const bodyData = req.body;
            const params = req.params;
            const response = await TodoService.UpdateSingleTodoService(params, bodyData);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to update todo",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async UpdateSingleTodoStatus(req, res){
        try {
            const bodyData = req.body;
            const params = req.params;
            const response = await TodoService.UpdateSingleTodoStatusService(params, bodyData);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to update todo",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async DeleteSingleTodo(req, res){
        try {
            const params = req.params;
            const response = await TodoService.DeleteSingleTodoService(params);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to delete todo",
                error_message: error.message,
                originalStack: error
            })
        }
    }
}

export default TodoController;