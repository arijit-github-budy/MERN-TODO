import express from 'express';

const router = express.Router();

router.get('todo/todos');
router.get('todo/:todoId');
router.post('todo/create');
router.put('todo/update');
router.delete('todo/delete');

export default router;
