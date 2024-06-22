import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
   let isAuthenticated = true;
   if (!Boolean(isAuthenticated)) {
      let userInfo = {
         status: 'failed',
         message: "Please login."
      }
      return <Navigate to='/login' replace={true} state={userInfo} />
   }
   return <Outlet />
}

export default ProtectedRoutes