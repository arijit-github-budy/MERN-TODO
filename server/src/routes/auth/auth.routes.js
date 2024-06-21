import express from 'express';
import AuthController from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', AuthController.UserRegistration);
router.post('/login', AuthController.UserLogin);
router.post('/logout', AuthController.UserLogout);

export default router;
