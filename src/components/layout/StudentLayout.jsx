import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; // <== VERY important
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="dashboard-content flex">
        <Sidebar />
        <div className="main-content flex-1 p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet /> 
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLayout;
