
import axios from 'axios';
import { INCREMENT, DECREMENT, CREATE_USER } from './counter.types';

export const createUserAction =(data) => {
    console.log(data)
    return async (dispatch, getState) => {
        try{
            let response = await axios.post(`http://localhost:5000/create-user`, {data});
// ?            let response = await axios.get(`http://localhost:5000/get-all-users`);
            // console.log("my message", response)
        if(response.data && response.data.message){
            alert(response.data.message)
        }
        }catch(error){
            console.log("Error came from createUser", error);
        }
    }
}

export const submitFormAction = (data) => {
    return async (dispatch, getState) => {
        // console.log("action data", data, getState().Counter);
        let { userData, sftpFile } = data;
        
        const formData = new FormData();
        formData.append("userData", JSON.stringify(userData));
        formData.append("sftpFile", sftpFile);
            
       const response =  await axios.post(`http://localhost:5000/sftFileUpload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
       });
       console.log("response from submitFormAction function call action", response);
    }
}


export const increaseCounter = () => {

    return {

        type: INCREMENT,

    };

};

export const decreaseCounter = () => {

    return {

        type: DECREMENT,

    };

};