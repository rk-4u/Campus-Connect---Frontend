import React, { useEffect, useState } from 'react';
import { getAllJobs, getMyApplications } from '../../services/studentService';
import JobCard from '../common/JobCard';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsData, applicationsData] = await Promise.all([
          getAllJobs(),
          getMyApplications()
        ]);
        setJobs(jobsData);

        // Extract job IDs from applications and store in a Set for fast lookup
        const appliedIds = new Set(applicationsData.map(app => app.job._id));
        setAppliedJobIds(appliedIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job._id} job={job} alreadyApplied={appliedJobIds.has(job._id)} />
        ))
      )}
    </div>
  );
};

export default JobsList;
