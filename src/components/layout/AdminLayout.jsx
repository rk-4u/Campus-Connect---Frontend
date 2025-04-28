import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; // ✅ Import Outlet
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import LoadingSpinner from '../common/LoadingSpinner';
import ProtectedRoute from '../common/ProtectedRoute'; // Import ProtectedRoute

const AdminLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="dashboard-content flex">
        <Sidebar />
        <div className="main-content flex-1 p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <Outlet /> {/* ✅ Use Outlet instead of children */}
            </ProtectedRoute>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
