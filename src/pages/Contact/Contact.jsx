import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './contact.module.css';
import { toast } from 'react-toastify';
import * as actions from '../../global/states/reducers/auth/auth.actions'

const default_form = {
  fullname: "",
  email: "",
  reason: ""
}

const Contact = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  console.log("contact state", authState);

  const [formData, setForm] = useState(default_form);

  const handleInputForm = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  }

  const clearFormData = () => {
    setForm(default_form);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      fullname,
      email,
      reason
    } = formData;

    if (!fullname || !email || !reason) {
      // alert("Please fill all the required field");
      toast.error("Please fill all the required field")
      return;
    }

    dispatch(actions.userContact(formData, clearFormData));
  }

  return (
    <div className={styles.container}>
      <h1>Contact</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" name="fullname" value={formData.fullname} className={styles.input} placeholder="Enter fullname" required onChange={(e) => handleInputForm(e)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name='email' value={formData.email} className={styles.input} placeholder="Enter email" required onChange={(e) => handleInputForm(e)} />
        </div>
        <div className={styles.formGroup}>
          <textarea
            placeholder="Reason"
            name='reason'
            value={formData.reason}
            onChange={(e) => handleInputForm(e)}
            className={styles.input}
            rows="5"
            required
          />
        </div>
        <button type="button" className={styles.submitButton} onClick={(e) => handleFormSubmit(e)}>Submit</button>
      </div>
    </div>
  )
}

export default Contact;