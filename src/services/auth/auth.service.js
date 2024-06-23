import moment from 'moment';
import AuthModel from '../../Models/auth/auth.model.js';
import FormValidation from '../../validators/form.validator.js';
import HashingUtils from '../../utils/hashing.utilty.js';
import JwtService from '../../utils/token.utility.js';

class AuthServices {
    constructor() {
    }

    static User = AuthModel.UserModel();
    static Contact = AuthModel.ContactModel();

    static async currentDateTime (){
        let tempCurrentDateTime = moment();
        let updatedDate = moment(tempCurrentDateTime).add(5, 'hours').add(30, 'minutes');
        let currentDate = updatedDate;

        return currentDate;
    }

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
            user_id: Date.now(),
            fullname,
            username,
            email,
            password: hashedPassword
        })

        if(!newUser){
            return {
                status: "error",
                code: 500,
                message: "User registraion failed",
            }
        }

        let new_user = newUser.toJSON();

        delete new_user.password;
        delete new_user._id;
        delete new_user.login_time;
        delete new_user.logout_time;
        delete new_user.login_status;
        delete new_user.updatedAt;
        delete new_user.createdAt;

        return {
            status: "success",
            message: "User has been created successfully",
            new_user
        }
    }

    static async UserLoginService(req, res) {
        const bodyData = req.body;
                
        const { email, password } = bodyData;

        const formValResponse = await FormValidation.LoginFormValidate(bodyData);

        if (formValResponse.status == "error") {
            return formValResponse;
        }
        

        const user = await this.FindUserDetails(email);

        if (!user) {
            return {
                status: "error",
                code: 200,
                message: "User is invalid",
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
                login_time: await this.currentDateTime()
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

        const user_data = {
            fullname: user.fullname,
            email: user.email
        }

        const user_token = await JwtService.GenerateJwtTokenService(user_data);

        if(!user_token){
            return {
                status: "error",
                code: 500,
                message: "Login failed due to token generation error.",
            }
        }

        let user_info = {
            fullname: user.fullname,
            email: user.email,
            login_status: updateResponse.login_status,
            login_time: updateResponse.login_time
        }

        return {
            status: "success",
            message: "User has been loggedIn successfully",
            token: user_token,
            user_info
        }
    }

    static async UserLogoutService(req, res) {
        let token = req.headers['authorization'];
        let user_email = req.headers['email'];

        if(!token){
            return {
                status: "error",
                code: 400,
                message: "Invalid token received",
            }
        }
        token = token.replace('Bearer ','');
        
        const verifiedTokenUser = await JwtService.VerifyJwtTokenService(token);

        let token_email = verifiedTokenUser.email;

        if(!(token_email == user_email)){
            return {
                status: "error",
                code: 400,
                message: "Invalid user try to logout.",
            }
        }

        const user = await this.FindUserDetails(token_email);

        if (!user) {
            return {
                status: "error",
                code: 400,
                message: "Invalid user try to logout.",
            }
        }
        
        const updateResponse = await this.User.findOneAndUpdate({
            email: user_email
        },{
            $set: {
                login_status: false,
                logout_time: await this.currentDateTime()
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

        let user_info = {
            fullname: user.fullname,
            email: user.email,
            login_status: updateResponse.login_status,
            logout_time: updateResponse.logout_time
        }

        return {
            status: "success",
            code: 200,
            message: "User has been logged out successfully",
            user_info
        }
    }

    static async UserContactService(req, res) {
        const bodyData = req.body;
        console.log(bodyData)
        const formValResponse = await FormValidation.ContactFormValidate(bodyData);

        if (formValResponse.status == "error") {
            return formValResponse;
        }

        const { fullname, email, reason } = bodyData;

        let contact_body = {
            fullname,
            email,
            reason,
            contact_time : await this.currentDateTime()
        }

        console.log(contact_body)

        let contactedUser = await this.Contact.create(contact_body);

        if(!contactedUser){
            return {
                status: "error",
                code: 500,
                message: "User contact request failed",
            }
        }

        return {
            status: "success",
            code: 200,
            message: "Thanks for contact with us. Our team will reach you soon.",        }
    }
}

export default AuthServices;