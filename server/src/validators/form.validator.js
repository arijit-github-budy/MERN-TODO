import EmailValidation from './email.validator.js';

class FormValidation {
    constructor() { }

    static async RegistrationFormValidate(request_data) {
        try {
            const { fullname, username, email, password } = request_data;

            if (!fullname || !username || !email || !password) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please fill all the requied fields."
                }
            }

            if (fullname.length < 6) {
                return {
                    status: "error",
                    code: 400,
                    message: "Fullname must be minimum 6 character."
                }
            }

            if (username.length < 4) {
                return {
                    status: "error",
                    code: 400,
                    message: "Username must be minimum 4 character long."
                }
            }

            const emailValidateStatus = await EmailValidation.EmailValidate(email);

            if (!emailValidateStatus) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please input valid email."
                }
            }

            if (password.length < 6) {
                return {
                    status: "error",
                    code: 400,
                    message: "Password must be minimum 6 character long."
                }
            }

            return {
                status: "success",
                code: 200,
                message: "Validation successfull"
            }
        } catch (error) {
            return {
                status: "error",
                code: 400,
                message: "Validation failed"
            }
        }

        
    }
    
    static async LoginFormValidate(request_data) {
        try {
            const { email, password } = request_data;

            if ( !email || !password) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please fill all the requied fields."
                }
            }

            const emailValidateStatus = await EmailValidation.EmailValidate(email);

            if (!emailValidateStatus) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please input valid email."
                }
            }

            if (password.length < 6) {
                return {
                    status: "error",
                    code: 400,
                    message: "Password must be minimum 6 character long."
                }
            }

            return {
                status: "success",
                code: 200,
                message: "Validation successfull"
            }
        } catch (error) {
            return {
                status: "error",
                code: 400,
                message: "Validation failed"
            }
        }

        
    }

    static async TodoFormValidate(request_data){
        try {
            const { title, description } = request_data;

            if(!title || !description){
                return {
                    status: "error",
                    code: 400,
                    message: "Please fill all the requied fields."
                }
            }

            if(title.length < 3){
                return {
                    status: "error",
                    code: 400,
                    message: "Title must be minimum 3 character long."
                }
            }

            if(description.length < 6){
                return {
                    status: "error",
                    code: 400,
                    message: "Title must be minimum 6 character long."
                }
            }

            return {
                status: "success",
                code: 200,
                message: "Validation successfull"
            }
        } catch (error) {
            return {
                status: "error",
                code: 400,
                message: "Validation failed"
            }
        }
    }

    static async ContactFormValidate(request_data) {
        try {
            const { fullname, email, reason } = request_data;

            if (!fullname || !email || !reason ) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please fill all the requied fields."
                }
            }

            if (fullname.length < 6) {
                return {
                    status: "error",
                    code: 400,
                    message: "Fullname must be minimum 6 character."
                }
            }

            if (reason.length < 6) {
                return {
                    status: "error",
                    code: 400,
                    message: "reason must be minimum 6 character."
                }
            }

            const emailValidateStatus = await EmailValidation.EmailValidate(email);

            if (!emailValidateStatus) {
                return {
                    status: "error",
                    code: 400,
                    message: "Please input valid email."
                }
            }

            return {
                status: "success",
                code: 200,
                message: "Validation successfull"
            }
        } catch (error) {
            return {
                status: "error",
                code: 400,
                message: "Validation failed"
            }
        }

        
    }
}

export default FormValidation;