import dotenv from 'dotenv'
dotenv.config();

const permissions = {
    cors_options: {
        // origin: String(process.env.ALLOW_ORIGINS).split(','),
        origin: true,
        methods: String(process.env.ALLOW_METHODS).split(','),
        allowedHeaders: String(process.env.ALLOW_HEADERS).split(','),
        credentials: true,
    }
}

export default Object.freeze(permissions);