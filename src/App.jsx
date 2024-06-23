import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.homePage}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Your TODO Dashboard</h1>
                    <p>Organize tasks, manage deadlines, and collaborate effectively with our intuitive TODO app.</p>
                    <Link to="/register" className={styles.getStartedButton}>Get Started</Link>
                </div>
            </header>
            <section className={styles.features}>
                <div className={styles.feature}>
                    <h2>Manage Tasks Efficiently</h2>
                    <p>Easily create, update, and prioritize tasks.</p>
                </div>
                <div className={styles.feature}>
                    <h2>Stay Organized</h2>
                    <p>Keep track of deadlines and progress.</p>
                </div>
                <div className={styles.feature}>
                    <h2>Collaborate Seamlessly</h2>
                    <p>Share tasks, assign responsibilities, and communicate within your team.</p>
                </div>
            </section>
            <section className={styles.aboutUs}>
                <div className={styles.aboutUsContent}>
                    <h2>About Us</h2>
                    <p>Learn more about our mission and values.</p>
                    <Link to="/about" className={styles.learnMoreButton}>Learn More</Link>
                </div>
            </section>
        </div>
  )
}

export default App;
