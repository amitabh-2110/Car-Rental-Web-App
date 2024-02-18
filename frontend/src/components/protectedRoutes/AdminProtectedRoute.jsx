import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const {token, role} = useSelector((state) => state.auth);

  if(token !== null && role === "admin") {
    return children;
  } else if(token !== null) {
    return <Navigate to="/" />
  } else {
    return <Navigate to="/login" />
  }
}

export default AdminProtectedRoute