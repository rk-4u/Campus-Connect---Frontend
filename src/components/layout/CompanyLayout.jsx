import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const CompanyLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* This renders the CompanyDashboard */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyLayout;
