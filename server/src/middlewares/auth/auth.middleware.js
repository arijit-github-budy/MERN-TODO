class AuthMiddleware {
    constructor() { }

    static UserAuthentication(req, res, next) {
        try {
            console.log("I am in user authentication middleware");
            // throw "I am good"
            next();
        } catch (error) {
            console.log("error in user authentication middleware", error);
            next(new Error(error));
        }
    }
}

export default AuthMiddleware;