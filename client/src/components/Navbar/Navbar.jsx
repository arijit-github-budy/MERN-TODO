import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import * as actions from '../../global/states/reducers/auth/auth.actions.js';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector((state) => state.auth);
    const { user } = authState;
    
    const loggedInUser = localStorage.getItem('user_fullname');
    const access_token = localStorage.getItem('access_token');

    const redirection = () => {
        navigate('/', {replace: true});
    }

    const handleLogOut = () => {
        dispatch(actions.userLogout(redirection));
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>TODO APP</Link>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    {
                        loggedInUser && access_token &&
                        (
                            <li><Link to="/auth/dashboard">Dashboard</Link></li>
                        ) 
                    }
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <ul className={styles.navLinks}>
                    {
                        access_token && loggedInUser ?
                            (
                                <>
                                    <li style={{color: 'crimson', fontWeight: '600', fontSize: '18px'}}>Welcome <span style={{marginLeft: '5px'}}>{loggedInUser}</span></li>
                                    <li><Link onClick={() => handleLogOut()}>Logout</Link></li>
                                </>
                            ) :
                            (
                                <>

                                    <li><Link to="/register">Register</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </>
                            )
                    }

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
