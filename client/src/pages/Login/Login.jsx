import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { toast } from 'react-toastify';
import * as actions from '../../global/states/reducers/auth/auth.actions.js';

const default_form = {
  email: "",
  password: ""
}


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const {user} = authState;

  useEffect(() => {
    if(user && user.email){
      setForm({...formData, 'email':user.email})
    }
  }, [user])

  const [formData, setForm] = useState(default_form);
  
  const handleInputForm = (e) => {
    setForm({...formData, [e.target.name]: e.target.value});
  }

  const clearFormData = () => {
    setForm(default_form);
    navigate("/auth/dashboard", {replace: true});
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password
    } = formData;

    if(!email|| !password){
      toast.error("Please fill all the required field")
      return;
    }

    dispatch(actions.userLogin(formData, clearFormData));
  }

  return (
    <div className={styles.container}>
    <h1>Sign In</h1>
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name='email' value={formData.email} disabled={user && user.email ? true : false} className={styles.input} placeholder="Enter email" required onChange={(e) => handleInputForm(e)}/>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" className={styles.input} placeholder="Enter password" required onChange={(e) => handleInputForm(e)} />
      </div>
      <button type="button" className={styles.submitButton} onClick={(e) => handleFormSubmit(e)}>Login</button>
    </div>
  </div>
  )
}

export default Login;