import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";

import CompanyLayout from '../../components/layout/CompanyLayout';

const CompanyDashboard = () => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://clg-placementproject-backend.onrender.com/api/company/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <CompanyLayout>
      <h2>Welcome, {user?.name}</h2>
      <div className="job-list">
        <h3>Posted Jobs</h3>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.title}</li>
          ))}
        </ul>
      </div>
    </CompanyLayout>
  );
};

export default CompanyDashboard;
