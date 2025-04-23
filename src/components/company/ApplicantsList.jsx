import React, { useEffect, useState } from 'react';
import { viewApplicants } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';

const ApplicantsList = ({ jobId }) => {
  const { token } = useAuth();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await viewApplicants(jobId, token);
        setApplicants(data);
      } catch (error) {
        alert('Failed to load applicants: ' + error.message);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId, token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <ul className="space-y-3">
          {applicants.map((applicant) => (
            <li key={applicant._id} className="border p-3 rounded">
              <p><strong>Name:</strong> {applicant.student?.name}</p>
              <p><strong>Email:</strong> {applicant.student?.email}</p>
              <p><strong>Resume:</strong> <a href={applicant.resumeUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantsList;
