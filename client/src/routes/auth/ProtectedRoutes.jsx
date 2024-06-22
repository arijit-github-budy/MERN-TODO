import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
   const loggedInUser = localStorage.getItem('user_fullname');
   const access_token = localStorage.getItem('access_token');

   let isAuthenticated = loggedInUser && access_token ? true : false;
   
   if (!Boolean(isAuthenticated)) {
      let userInfo = {
         status: 'error',
         message: "Please login first."
      }
      return <Navigate to='/login' replace={true} state={userInfo} />
   }
   return <Outlet />
}

export default ProtectedRoutes