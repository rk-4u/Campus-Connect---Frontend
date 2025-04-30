import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { getCompanyJobs } from '../../services/companyService';

const CompanyDashboard = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getCompanyJobs(token);
        setJobs(response.data);
      } catch (error) {
        setError('Error fetching jobs: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <div className="company-dashboard">
      <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="p-4 border rounded shadow">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <Link
                  to={`/company/jobs/${job._id}/applicants`}
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Applicants
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
