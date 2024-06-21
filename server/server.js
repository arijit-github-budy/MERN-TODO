import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv'
import Configurations from './src/config/connection.config.js';
import userRoutes from './src/routes/user/user.routes.js';
import authRoutes from './src/routes/auth/auth.routes.js';
import AuthMiddleware from './src/middlewares/auth/auth.middleware.js';
import ErrorMiddleware from './src/middlewares/error.middleware.js';

dotenv.config();

const server = express();

const PORT = process.env.PORT || 5000;



server.use(express.json());
server.use(express.urlencoded({extended: true}));

// public static serving
server.use(express.static('public'));


server.use(logger('dev'));


server.use('/api/v1/user', userRoutes)
server.use('/api/v1/auth', AuthMiddleware.UserAuthentication, authRoutes)

server.use(ErrorMiddleware.ErrorHandler);

server.listen(PORT, async () => {
    try {
        const resp = await Configurations.ConnectWithMongoDB();
        console.log(`server is running on ${PORT} port.`);
    } catch (error) {
        console.log("error", error, error.message)
        process.exit(0)
    }
});