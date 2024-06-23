import express from 'express';
import AuthController from '../../controllers/auth/auth.controller.js';

const router = express.Router();

router.post('/register', AuthController.UserRegistration);
router.post('/login', AuthController.UserLogin);
router.post('/logout', AuthController.UserLogout);
router.post('/contact', AuthController.UserContact);

export default router;
