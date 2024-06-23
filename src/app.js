import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import permissionConfig from './config/permission.config.js';
import todoRoutes from './routes/user/todo.routes.js';
import authRoutes from './routes/auth/auth.routes.js';
import UserMiddleware from './middlewares/auth/user.middleware.js';
import ErrorMiddleware from './middlewares/error/error.middleware.js';

// intitalize server
const server = express();
// allows origins and methods
const { cors_options } = permissionConfig;
console.log(cors_options)
server.use(cors(cors_options));

// form data and json body parser
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// public static serving
server.use(express.static('public'));

// log routes
server.use(logger('dev'));

// all api sections
server.use('/api/v1/user/todo', UserMiddleware.UserAuthentication, todoRoutes);
server.use('/api/v1/auth', authRoutes);

// error handler
server.use(ErrorMiddleware.ErrorHandler);

export default server;

