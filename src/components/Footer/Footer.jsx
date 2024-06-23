import React from 'react'
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>TODO APP</Link>
        <p className={styles.copyright}>
          © 2024 TODO APP. All rights reserved.
        </p>
        <div className={styles.contactInfo}>
          <em className={styles.email}>
            Email: info@example.com
          </em>
          <em className={styles.mobile}>
            Phone: +91 9090909090
          </em>
          <em className={styles.address}>
            123 Main St, Cityville, State, Country
          </em>
          <em className={styles.pincode}>
            Pincode: 123456
          </em>
        </div>
      </div>
    </footer>
  )
}

export default Footer