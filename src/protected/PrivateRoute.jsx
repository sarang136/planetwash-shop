import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  console.log("PrivateRoute loaded. Token:", token);

  if (!token) {
    console.log("No token found. Redirecting to /signin");
    return <Navigate to="/signin" replace />;
  }

  console.log("Token found. Rendering AdminLayout");
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default PrivateRoute;
