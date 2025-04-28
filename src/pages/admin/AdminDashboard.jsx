import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://clg-placementproject-backend.onrender.com/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Total Placements</h3>
            <p className="text-2xl font-bold">{stats.totalPlacements || 0}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Pending Applications</h3>
            <p className="text-2xl font-bold">{stats.pendingApplications || 0}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Total Companies</h3>
            <p className="text-2xl font-bold">{stats.totalCompanies || 0}</p>
          </div>
        </div>

        {/* Placement Drives (optional) */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Placement Drives Overview</h2>
          </div>
          {loading ? (
            <div className="p-4">Loading stats...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            <div className="p-4 text-gray-700">
              {/* Add more stats here if available */}
              Drive-related data will be shown here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
