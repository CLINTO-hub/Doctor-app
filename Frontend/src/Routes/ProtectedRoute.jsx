import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(authContext);
    const isLoggedIn = !!token;
    const isAllowed = !allowedRoles || allowedRoles.includes(role);

    if (isLoggedIn && isAllowed) {
        return children;
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default ProtectedRoute;
