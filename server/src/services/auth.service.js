import AuthModel from '../Models/auth/auth.model.js';
import FormValidation from '../validators/form.validator.js';
import HashingUtils from '../utils/hashing.utilty.js';
import JwtService from '../utils/token.utility.js';

class AuthServices {
    constructor() {
    }

    static User = AuthModel.UserModel();

    static async FindUserDetails(email) {
        const foundedUser = await this.User.findOne({
            email
        })
        return foundedUser;
    }

    static async UserRegistrationService(bodyData) {
        
        const formValResponse = await FormValidation.RegistrationFormValidate(bodyData);

        if (formValResponse.status == "error") {
            return formValResponse;
        }

        const { fullname, username, email, password } = bodyData;

        const user = await this.FindUserDetails(email);

        if (user) {
            return {
                status: "error",
                code: 200,
                message: "User already exists",
                user
            }
        }

        const hashedPassword = await HashingUtils.HashContentService(password);

        if (!hashedPassword) {
            return {
                status: "error",
                code: 500,
                message: "Password hashing failed",
            }
        }


        let newUser = await this.User.create({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        newUser = newUser.toJSON();

        if(!newUser){
            return {
                status: "error",
                code: 500,
                message: "User registraion failed",
            }
        }

        delete newUser.password;
        delete newUser.__v;

        const user_info = {
            fullname: newUser.fullname,
            email: newUser.email
        }

        const user_token = await JwtService.GenerateJwtTokenService(user_info);

        if(!user_token){
            return {
                status: "error",
                code: 500,
                message: "Token generation failed",
            }
        }

        return {
            status: "success",
            message: "User has been created successfully",
            toke: user_token,
            newUser
        }
    }

    static async UserLoginService(req, res) {
        const bodyData = req.body;
        let token = req.headers['authorization'];

        if(!token){
            return {
                status: "error",
                code: 400,
                message: "Invalid token received",
            }
        }
        token = token.replace('Bearer ','');
        
        const verifiedTokenUser = await JwtService.VerifyJwtTokenService(token);
        
        // console.log("toke user info", verifiedTokenUser)
        
        const { email, password } = bodyData;

        if(!(email == verifiedTokenUser.email)){
            return {
                status: "error",
                code: 400,
                message: "Invalid token received",
            }
        }

        const formValResponse = await FormValidation.LoginFormValidate(bodyData);

        if (formValResponse.status == "error") {
            return formValResponse;
        }
        

        const user = await this.FindUserDetails(email);

        if (!user) {
            return {
                status: "error",
                code: 200,
                message: "Wrong credentials",
            }
        }
        
        let userSavedHashedPassword = user.password;

        const compareStatus = await HashingUtils.CompareHashedContentService(password, userSavedHashedPassword);

        if (!compareStatus) {
            return {
                status: "error",
                code: 400,
                message: "Wrong credentials",
            }
        }

        const updateResponse = await this.User.findOneAndUpdate({
            email
        },{
            $set: {
                login_status: true,
                login_time: new Date()
            }
        }, {
            new: true
        });

        if(!updateResponse){
            return {
                status: "error",
                code: 400,
                message: "Something went wrong to login. Please try again.",
            }
        }

        console.log("updated user", updateResponse)

        return {
            status: "success",
            message: "User has been loggedIn successfully",
            user: user.fullname,
            email: user.email,
            login_status: updateResponse.login_status,
            login_time: updateResponse.login_time
        }
    }

    static async UserLogoutService(req, res) {
        const bodyData = req.body;
        let token = req.headers['authorization'];

        if(!token){
            return {
                status: "error",
                code: 400,
                message: "Invalid token received",
            }
        }
        token = token.replace('Bearer ','');
        
        const verifiedTokenUser = await JwtService.VerifyJwtTokenService(token);

        const { email:user_email, password } = bodyData;

        if(!(user_email == verifiedTokenUser.email)){
            return {
                status: "error",
                code: 400,
                message: "Invalid token received",
            }
        }

        let email = verifiedTokenUser.email;

        const user = await this.FindUserDetails(email);

        if (!user) {
            return {
                status: "error",
                code: 200,
                message: "Wrong credentials",
            }
        }
        
        let userSavedHashedPassword = user.password;

        const compareStatus = await HashingUtils.CompareHashedContentService(password, userSavedHashedPassword);

        if (!compareStatus) {
            return {
                status: "error",
                code: 400,
                message: "Wrong credentials",
            }
        }
        
        const updateResponse = await this.User.findOneAndUpdate({
            email
        },{
            $set: {
                login_status: false,
                logout_time: new Date()
            }
        }, {
            new: true
        });

        if(!updateResponse){
            return {
                status: "error",
                code: 400,
                message: "Something went wrong to logout. Please try again.",
            }
        }

        // console.log("updated user", updateResponse)

        return {
            status: "success",
            message: "User has been loggedOut successfully",
            user: user.fullname,
            email: user.email,
            login_status: updateResponse.login_status,
            logout_time: updateResponse.logout_time
        }
    }
}

export default AuthServices;