import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError('Please select a resume to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile); // This name MUST match upload.single('resume')
    formData.append('coverLetter', coverLetter);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/applications/${jobId}/apply`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Ensure token exists
          },
        }
      );
      
      setSuccess('Applied successfully!');
      setTimeout(() => navigate('/student/jobs'), 1500);
    } catch (err) {
      console.error('Apply error:', err);
      setError(err?.response?.data?.error || 'You may have already applied or an error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Apply for Job</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleApply}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Resume (PDF):</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full border px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Cover Letter (optional):</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border px-3 py-2"
            rows="4"
          />
        </div>
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
