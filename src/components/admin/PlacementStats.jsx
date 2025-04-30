import React, { useEffect, useState } from 'react';
import { getPlacementStats } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const PlacementStats = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPlacementStats(token);
        setStats(data ?? {}); // Ensure stats is always an object
      } catch (error) {
        alert('Error fetching stats: ' + error.message);
        setStats({});
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <div className="text-center py-8">Loading stats...</div>;

  if (!stats) return <div className="text-center py-8 text-red-500">No stats available.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Placement Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-xl">{stats.totalStudents ?? 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Companies</h3>
          <p className="text-xl">{stats.totalCompanies ?? 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-xl">{stats.totalJobs ?? 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Applications</h3>
          <p className="text-xl">{stats.totalApplications ?? 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Interviews</h3>
          <p className="text-xl">{stats.totalInterviews ?? 0}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Placements</h3>
          <p className="text-xl">{stats.totalPlacements ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlacementStats;
