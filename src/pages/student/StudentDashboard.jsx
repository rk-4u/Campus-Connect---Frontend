import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import StudentLayout from '../../components/layout/StudentLayout';
import { getAllJobs, getMyApplications } from '../../services/studentService';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);

        const appsData = await getMyApplications();
        setApplications(appsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

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

