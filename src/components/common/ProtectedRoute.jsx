import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    // Example: a company tries to access /admin dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // Logged in and correct role
  return children;
};

export default ProtectedRoute;

