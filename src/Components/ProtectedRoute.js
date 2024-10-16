import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children, admin }) => {
    return admin ? children : <Navigate to='/dashboard'></Navigate>
}