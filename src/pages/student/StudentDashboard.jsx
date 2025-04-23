import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";

import StudentLayout from '../../components/layout/StudentLayout';

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get('https://clg-placementproject-backend.onrender.com/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobsResponse.data);

        const applicationsResponse = await axios.get('https://clg-placementproject-backend.onrender.com/api/applications/my-applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(applicationsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <StudentLayout>
      <h2>Welcome, {user?.name}</h2>
      <div className="job-list">
        <h3>Available Jobs</h3>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.title}</li>
          ))}
        </ul>
      </div>
      <div className="application-list">
        <h3>My Applications</h3>
        <ul>
          {applications.map((application) => (
            <li key={application._id}>{application.job.title}</li>
          ))}
        </ul>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
