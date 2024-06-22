import React from 'react';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
    <h1>Sign In</h1>
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name='email' className={styles.input} placeholder="Enter email" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" className={styles.input} placeholder="Enter password" required />
      </div>
      <button type="button" className={styles.submitButton}>Login</button>
    </div>
  </div>
  )
}

export default Login;