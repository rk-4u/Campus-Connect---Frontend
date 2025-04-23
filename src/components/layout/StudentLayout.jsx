import React, { Suspense } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import ProtectedRoute from '../common/ProtectedRoute'; // Import ProtectedRoute
import LoadingSpinner from '../common/LoadingSpinner'; // Import LoadingSpinner

const StudentLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>{children}</ProtectedRoute> {/* Wrap the children with ProtectedRoute */}
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLayout;
