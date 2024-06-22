import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/Error/Error';
import Contact from '../pages/Contact/Contact';
import ProtectedRoutes from './auth/ProtectedRoutes';
import Layout from '../components/Layouts/Layout';
import App from '../App';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<App />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='/auth/dashboard' element={<ProtectedRoutes />}>
                            <Route index element={<Home />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;