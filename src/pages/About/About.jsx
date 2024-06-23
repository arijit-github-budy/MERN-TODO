import React from 'react'
import styles from './about.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.container}>
    <div className={styles.hero}>
        <h1>About Us</h1>
        <p>We are committed to simplifying task management with our intuitive TODO application.</p>
    </div>
    <div className={styles.content}>
        <div className={styles.text}>
            <h2>Our Mission</h2>
            <p>To empower individuals and teams to achieve more by providing a powerful yet easy-to-use TODO app.</p>
        </div>
        <div className={styles.text}>
            <h2>Why Choose Us?</h2>
            <p>With our app, you can organize tasks efficiently, collaborate seamlessly, and achieve your goals effectively.</p>
        </div>
        <div className={styles.text}>
            <h2>Contact Us</h2>
            <p>For any inquiries or support, please email us at <Link className={styles.link}>royarijit8084@gmail.com</Link>.</p>
        </div>
    </div>
    <div className={styles.cta}>
        <Link to="/" className={styles.ctaButton}>Get Started</Link>
    </div>
</div>
  )
}

export default React.memo(About);