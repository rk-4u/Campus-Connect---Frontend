import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { viewApplicants } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';

const ApplicantsList = ({ jobId: propJobId }) => {
  const { token } = useAuth();
  const { jobId: routeJobId } = useParams();
  const jobId = propJobId || routeJobId;
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await viewApplicants(jobId, token);
        console.log("Fetched applicants:", data); // Log the applicants data for debugging
        setApplicants(data); // Set the applicants data into state
      } catch (error) {
        setError('Failed to load applicants: ' + error.message); // Handle error state
      } finally {
        setLoading(false);
      }
    };

    if (jobId && token) {
      fetchApplicants(); // Fetch applicants when jobId and token are available
    }
  }, [jobId, token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Applicants</h2>
      
      {loading && <p>Loading applicants...</p>} {/* Display loading message */}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <ul className="space-y-3">
          {applicants.map((applicant) => (
            <li key={applicant._id} className="border p-3 rounded">
              <p><strong>Name:</strong> {applicant.student?.name}</p>
              <p><strong>Email:</strong> {applicant.student?.email}</p>
              <p>
                <strong>Resume:</strong>{' '}
                <a
                  href={applicant.resume}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantsList;
