// src/components/student/JobsList.jsx
import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../../services/studentService';
import JobCard from '../common/JobCard';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch all jobs available for students
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  );
};

export default JobsList;
