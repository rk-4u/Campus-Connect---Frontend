import React, { useEffect, useState } from 'react';
import { getCompanyJobs } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const CompanyJobsList = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await getCompanyJobs(token);
        setJobs(result.data); // Assuming the backend sends { success: true, data: [...] }
      } catch (error) {
        alert('Failed to fetch jobs: ' + error.message);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map(job => (
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
  );
};

export default CompanyJobsList;
