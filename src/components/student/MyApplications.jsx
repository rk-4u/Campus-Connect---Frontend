// src/components/student/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import { getMyApplications } from '../../services/studentService';
import ApplicationCard from '../common/ApplicationCard';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications for the student
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications();
        setApplications(response);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))
      )}
    </div>
  );
};

export default MyApplications;
