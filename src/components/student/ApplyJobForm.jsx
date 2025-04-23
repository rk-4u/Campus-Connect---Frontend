import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applyToJob } from '../../services/studentService';

const ApplyJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await applyToJob(jobId);
      setSuccess('Applied successfully!');
      setTimeout(() => navigate('/student/my-applications'), 1500);
    } catch (err) {
      setError('You may have already applied or an error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Apply for Job</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleApply}>
        <p className="mb-4">Are you sure you want to apply for this job?</p>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default ApplyJobForm;
