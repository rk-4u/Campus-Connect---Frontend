import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";
import { getPlacementDrives } from '../../services/adminService';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({});
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, drivesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          getPlacementDrives(token)
        ]);

        setStats(statsRes.data);
        setDrives(drivesRes);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

        {/* Placement Drives Overview */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Placement Drives Overview</h2>
          </div>

          {loading ? (
            <div className="p-4">Loading data...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            <div className="p-4 text-gray-700 space-y-3">
              <p><strong>Total Drives:</strong> {drives.length}</p>
              <ul className="space-y-1">
                {drives.slice(0, 5).map((drive) => (
                  <li key={drive._id}>
                    <strong>{drive.name}</strong> &mdash; {new Date(drive.startDate).toLocaleDateString()} to {new Date(drive.endDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
