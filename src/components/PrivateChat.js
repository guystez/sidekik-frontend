import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateChat = () => {
  const isAuthenticated = localStorage.getItem('session') === 'logged-in'; 

  // If authenticated, return an outlet that will render child elements 
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateChat;
