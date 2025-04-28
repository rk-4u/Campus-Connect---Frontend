import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const CompanyDashboard = () => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // New state for error handling

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        setError('You are not authorized. Please log in again.');
        setLoading(false);
        return;  // Exit early if there's no token
      }

      try {
        console.log('Fetching jobs with token:', token); // Log the token for debugging
        const response = await axios.get('https://clg-placementproject-backend.onrender.com/api/company/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Error fetching jobs: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  // Check if we're on the main dashboard route
  const isDashboard = location.pathname === '/company/dashboard';

  return (
    <div className="company-dashboard">
      {isDashboard && (
        <div className="dashboard-content">
          <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Posted Jobs</h3>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Total Applicants</h3>
              <p className="text-2xl font-bold">
                {jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Active Interviews</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Your Job Postings</h2>
            </div>
            {loading ? (
              <div className="p-4">Loading jobs...</div>
            ) : error ? (
              <div className="p-4 text-red-500">{error}</div>  // Show the error message
            ) : jobs.length === 0 ? (
              <div className="p-4 text-gray-500">No jobs posted yet</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <li key={job._id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      <Link
                        to={`/company/jobs/${job._id}/applicants`}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100"
                      >
                        View Applicants
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;

