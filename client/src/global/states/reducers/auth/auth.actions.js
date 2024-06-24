import AuthAxios from '../../../../utils/axios.utils';
import { REGISTRATION, LOGIN, LOGOUT } from './auth.types';
import { toast } from 'react-toastify';

export const userRegistration = (data, clearFormData) => {
    return async (dispatch, getState) => {
        try {
            let response = await AuthAxios.post(`/auth/register`, data);
            const { status, message, new_user } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                dispatch({
                    type: REGISTRATION,
                    payload: new_user
                })
                clearFormData();
            }


        } catch (error) {
            console.log("Error came from create user", error);
            toast.error("Registration failed. Please try again.")
        }
    }
}

export const userLogin = (data, clearFormData) => {
    return async (dispatch, getState) => {
        try {
            let response = await AuthAxios.post(`/auth/login`, data);
            const { status, message, token, user_info } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                dispatch({
                    type: LOGIN,
                    payload: user_info
                });
                localStorage.setItem('access_token', token);
                localStorage.setItem('user_email', user_info.email);
                localStorage.setItem('user_fullname', user_info.fullname);
    
                clearFormData();
            }



        } catch (error) {
            console.log("Error came from login user", error);
            toast.error("Login failed. Please try again.")
        }
    }
}

export const userLogout = (redirection) => {
    return async (dispatch, getState) => {
        try {
            let response = await AuthAxios.post(`/auth/logout`);
            const { status, message, user_info } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                dispatch({
                    type: LOGOUT,
                    payload: user_info
                });
    
                if (!user_info || user_info.login_status) {
                    toast.error("User logout failed. Try again later.");
                    return;
                }
    
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_fullname');
    
                toast.success(message)
    
                redirection();
            }

        } catch (error) {
            console.log("Error came from logout user", error);
            toast.error("Logout failed. Please try again.")
        }
    }
}

export const userContact = (request_data, clearFormData) => {
    return async (dispatch, getState) => {
        try {
            let response = await AuthAxios.post(`/auth/contact`, request_data);
            const { status, message, new_todo } = response.data

            if (status && String(status).toLowerCase() == "error") {
                toast.error(message);
                return;
            }

            if (status && String(status).toLowerCase() == "success") {
                toast.success(message);
                clearFormData();
            }

        } catch (error) {
            console.log("Error came from contact section", error);
            toast.error("Failed to save contact. Please try again.")
        }
    }
}