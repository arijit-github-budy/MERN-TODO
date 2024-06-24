import AuthServices from "../../services/auth/auth.service.js";
import JwtService from "../../utils/token.utility.js";

class UserMiddleware {
    constructor() { }

    static async UserAuthentication(req, res, next) {
        try {
            console.log("I am in user authentication middleware");
            let token = req.headers['authorization'];
            let email = req.headers['email'];

            
            if(!token){
                throw new Error('Invalid token received')
            }
            
            token = token.replace('Bearer ', '');

            const user_info = await JwtService.VerifyJwtTokenService(token);

            if(!(user_info.email == email)){
                throw new Error('Email is not matched with token');
            }
            
            const founded_user = await AuthServices.FindUserDetails(email);

            if(!founded_user){
                throw new Error('Invalid user');
            }

            if(!(String(founded_user.active_status).toLowerCase() == 'active')){
                throw new Error('Current user is inactive for perform any action');
            }

            if(!founded_user.login_status){
                throw new Error('Current user is not logged in');
            }

            next();
        } catch (error) {
            console.log("error in user authentication middleware", error);
            next(new Error(error));
        }
    }
}

export default UserMiddleware;