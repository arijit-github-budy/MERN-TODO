import AuthServices from '../services/auth.service.js';

class AuthController {
    constructor() {}

    static async UserRegistration(req, res) {
        try {
            const bodyData = req.body;
            const response = await AuthServices.UserRegistrationService(bodyData);
            res.status(201).json(response)
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: "user not created",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async UserLogin(req, res) {
        try {
            const response = await AuthServices.UserLoginService(req, res);
            res.status(200).json(response)
        } catch (error) {
            console.log("error of login", error);
            res.status(400).json({
                status: "error",
                message: "User login failed",
                error_message: error.message,
                originalStack: error
            })
        }
    }

    static async UserLogout(req, res) {
        try {
            const response = await AuthServices.UserLogoutService(req, res);
            res.status(200).json(response)
        } catch (error) {
            console.log("error of logout", error);
            res.status(400).json({
                status: "error",
                message: "User logout failed",
                error_message: error.message,
                originalStack: error
            })
        }
    }
}

export default AuthController;