import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { viewApplicants, checkInterviewScheduled } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';
import ScheduleInterview from './ScheduleInterview';

const ApplicantsList = ({ jobId: propJobId }) => {
  const { token } = useAuth();
  const { jobId: routeJobId } = useParams();
  const jobId = propJobId || routeJobId;
  const [applicants, setApplicants] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState({});
  const [openFormFor, setOpenFormFor] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await viewApplicants(jobId, token);
        setApplicants(data);

        // Check interview status for each applicant
        for (let app of data) {
          const res = await checkInterviewScheduled(app._id, token);
          setInterviewStatus(prev => ({
            ...prev,
            [app._id]: res.scheduled ? res.interview : null
          }));
        }
      } catch (error) {
        console.error('Failed to fetch applicants or interviews', error);
      }
    };

    if (jobId && token) fetchApplicants();
  }, [jobId, token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Applicants for Job ID: {jobId}</h2>

      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <ul className="space-y-5">
          {applicants.map(app => (
            <li key={app._id} className="border p-4 rounded">
              <p><strong>Name:</strong> {app.student?.name}</p>
              <p><strong>Email:</strong> {app.student?.email}</p>
              <p><strong>Resume:</strong> <a href={app.resume} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a></p>

              {interviewStatus[app._id] ? (
                <p className="text-green-600 mt-2">✅ Interview Scheduled on {new Date(interviewStatus[app._id].dateTime).toLocaleString()}</p>
              ) : (
                <>
                  <button
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setOpenFormFor(openFormFor === app._id ? null : app._id)}
                  >
                    {openFormFor === app._id ? 'Cancel' : 'Schedule Interview'}
                  </button>

                  {openFormFor === app._id && (
                    <ScheduleInterview
                      jobId={jobId}
                      studentId={app.student._id}
                      applicationId={app._id}
                      onClose={() => setOpenFormFor(null)}
                      onScheduled={() => {
                        setInterviewStatus(prev => ({
                          ...prev,
                          [app._id]: { dateTime: new Date() } // dummy update or you can re-fetch
                        }));
                        setOpenFormFor(null);
                      }}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantsList;
