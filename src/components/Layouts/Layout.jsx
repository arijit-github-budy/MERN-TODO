import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import styles from './layout.module.css';
import Notification from '../Notification/Notification';

const Layout = () => {
  return (
    <>
      <Notification />
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout