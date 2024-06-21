class ErrorMiddleware {
    constructor() { }

    static ErrorHandler = (err, req, res, next) => {
        const errStatus = err.statusCode || 500;
        const errMsg = err.message || 'Something went wrong. Internal server problem';
        res.status(errStatus).json({
            success: false,
            status: errStatus,
            message: errMsg,
            stack: process.env.DEBUG_MODE === 'development' ? err.stack : {}
        })
    }
}

export default ErrorMiddleware;