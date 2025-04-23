import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";

import AdminLayout from '../../components/layout/AdminLayout';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://clg-placementproject-backend.onrender.com/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <AdminLayout>
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <h3>Placement Stats</h3>
        <p>Total Placements: {stats.totalPlacements}</p>
        <p>Pending Applications: {stats.pendingApplications}</p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
