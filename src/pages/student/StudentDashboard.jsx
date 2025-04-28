import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { getAllJobs, getMyApplications } from '../../services/studentService';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);

        const appsData = await getMyApplications();
        setApplications(appsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="dashboard-content">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Available Jobs</h3>
            <p className="text-2xl font-bold">{jobs.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">My Applications</h3>
            <p className="text-2xl font-bold">{applications.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Jobs I Haven't Applied</h3>
            <p className="text-2xl font-bold">{jobs.length - applications.length}</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Available Jobs</h2>
          </div>
          {loading ? (
            <div className="p-4">Loading jobs...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : jobs.length === 0 ? (
            <div className="p-4 text-gray-500">No jobs available right now.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <li key={job._id} className="p-4 hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.location || 'Location not specified'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* My Applications List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">My Applications</h2>
          </div>
          {loading ? (
            <div className="p-4">Loading applications...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : applications.length === 0 ? (
            <div className="p-4 text-gray-500">You haven't applied for any jobs yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application._id} className="p-4 hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{application.job?.title}</h3>
                    <p className="text-sm text-gray-500">{application.job?.location || 'Location not specified'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
