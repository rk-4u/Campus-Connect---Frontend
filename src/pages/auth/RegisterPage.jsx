import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  // Validate role
  const validRoles = ['student', 'company', 'admin'];
  if (role && !validRoles.includes(role)) {
    navigate('/register/student'); // Redirect to default role
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
