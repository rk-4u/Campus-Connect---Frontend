import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  if (!role || !['student', 'company', 'admin'].includes(role)) {
    // Redirect to home or a default role
    navigate('/login/student');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm role={role} />
    </div>
  );
};

export default LoginPage;
