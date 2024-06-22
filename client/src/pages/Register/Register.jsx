import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../global/states/reducers/auth/auth.actions'
import { toast } from 'react-toastify';

const default_form = {
  fullname:"",
  username: "",
  email: "",
  password: ""
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  console.log("register state", authState);

  const [formData, setForm] = useState(default_form);
  
  const handleInputForm = (e) => {
    setForm({...formData, [e.target.name]: e.target.value});
  }

  const clearFormData = () => {
    setForm(default_form);
    navigate("/login", {replace: true});
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      fullname,
      username,
      email,
      password
    } = formData;

    if(!fullname || !username || !email|| !password){
      // alert("Please fill all the required field");
      toast.error("Please fill all the required field")
      return;
    }

    dispatch(actions.userRegistration(formData, clearFormData));
  }
  
  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" name="fullname" className={styles.input} placeholder="Enter fullname" required onChange={(e) => handleInputForm(e)}  />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className={styles.input} placeholder="Enter username" required onChange={(e) => handleInputForm(e)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name='email' className={styles.input} placeholder="Enter email" required onChange={(e) => handleInputForm(e)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className={styles.input} placeholder="Enter password" required onChange={(e) => handleInputForm(e)} />
        </div>
        <button type="button" className={styles.submitButton} onClick={(e) => handleFormSubmit(e)}>Register</button>
      </div>
    </div>
  )
}

export default Register;