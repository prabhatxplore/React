

import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const { user, loading } = useAuth()
    console.log("Protected route checking")
    console.log(user)

    if(loading) return <div className='text-center'>Loading...</div>

    if (!user) {
        return <Navigate to="/login" />
    }


    return <Outlet />
}

export default ProtectedRoute