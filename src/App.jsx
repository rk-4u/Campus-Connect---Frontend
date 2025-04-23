import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layout Components
import StudentLayout from './components/layout/StudentLayout';
import CompanyLayout from './components/layout/CompanyLayout';
import AdminLayout from './components/layout/AdminLayout';

// Page Components
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/register/:role" element={<RegisterPage />} />
          
          {/* Fallbacks for /login and /register */}
          <Route path="/login" element={<Navigate to="/login/student" />} />
          <Route path="/register" element={<Navigate to="/register/student" />} />
          <Route path="/" element={<Navigate to="/login/student" />} />

          {/* Student Protected Route */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentLayout>
                  <StudentDashboard />
                </StudentLayout>
              </ProtectedRoute>
            }
          />

          {/* Company Protected Route */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute role="company">
                <CompanyLayout>
                  <CompanyDashboard />
                </CompanyLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
