import React from 'react';
import styles from './register.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" name="fullname" className={styles.input} placeholder="Enter fullname" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className={styles.input} placeholder="Enter username" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name='email' className={styles.input} placeholder="Enter email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className={styles.input} placeholder="Enter password" required />
        </div>
        <button type="button" className={styles.submitButton}>Register</button>
      </div>
    </div>
  )
}

export default Register;