import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>Logo</Link>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/auth/dashboard">Dashboard</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <ul className={styles.navLinks}>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
