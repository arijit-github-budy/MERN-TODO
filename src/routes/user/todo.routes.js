import express from 'express';
import TodoController from '../../controllers/user/todo.controller.js';

const router = express.Router();

router.post('/create', TodoController.CreateTodo);
router.get('/search', TodoController.SearchTodo);
router.get('/todos', TodoController.GetAllTodos);
router.get('/:todoId', TodoController.GetSingleTodo);
router.patch('/update/:todoId', TodoController.UpdateSingleTodo);
router.patch('/update/status/:todoId', TodoController.UpdateSingleTodoStatus);
router.delete('/delete/:todoId', TodoController.DeleteSingleTodo);

export default router;
