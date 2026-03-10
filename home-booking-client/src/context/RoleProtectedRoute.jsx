

import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function RoleProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth()
    console.log("Protected route checking")
    console.log("Loading Status", loading)
    console.log(user)

    if (loading) return <div className='text-center'>Loading...</div>

    if (!user) {
        toast.info("Please login to view details")
        return <Navigate to="/login" />
    }

    if (!allowedRoles.includes(user.user_type)) {
        toast.info(`user have to be ${allowedRoles[0]}`)
        return <Navigate to="/unauthorized" />
    }

    return <Outlet />
}

export default RoleProtectedRoute