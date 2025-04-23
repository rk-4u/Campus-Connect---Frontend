import React, { useState } from 'react';
import { postJob } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';

const JobPostForm = () => {
  const { token } = useAuth();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJob(jobData, token);
      alert('Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        location: '',
        salary: '',
        requirements: '',
        deadline: '',
      });
    } catch (error) {
      alert('Error posting job: ' + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'location', 'salary', 'requirements', 'deadline'].map((field) => (
          <input
            key={field}
            type={field === 'salary' ? 'number' : 'text'}
            name={field}
            value={jobData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
