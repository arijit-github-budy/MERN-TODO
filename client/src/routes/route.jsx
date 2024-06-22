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

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<App />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='/auth' element={<ProtectedRoutes />}>
                            <Route path="home">
                                <Route index element={<Home />} />
                            </Route>
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                        <Route path="contact">
                            <Route index element={<Contact />} />
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;