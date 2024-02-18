import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({children}) => {
  const { token, role } = useSelector(state => state.userAuth);

  if(token !== null && role === "user") {
    return children;
  } else if(token !== null) {
    return <Navigate to="/" />
  } else {
    return <Navigate to="/login" />
  }
}

export default UserProtectedRoute