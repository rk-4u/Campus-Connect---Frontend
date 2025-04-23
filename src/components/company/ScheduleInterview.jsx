import React, { useState } from 'react';
import { scheduleInterview } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';

const ScheduleInterview = () => {
  const { token } = useAuth();
  const [interviewData, setInterviewData] = useState({
    jobId: '',
    studentId: '',
    date: '',
    time: '',
    mode: '',
    link: '',
  });

  const handleChange = (e) => {
    setInterviewData({ ...interviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scheduleInterview(interviewData, token);
      alert('Interview scheduled!');
      setInterviewData({
        jobId: '',
        studentId: '',
        date: '',
        time: '',
        mode: '',
        link: '',
      });
    } catch (error) {
      alert('Error scheduling interview: ' + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Schedule Interview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="jobId" placeholder="Job ID" value={interviewData.jobId} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="studentId" placeholder="Student ID" value={interviewData.studentId} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="date" value={interviewData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="time" name="time" value={interviewData.time} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="mode" placeholder="Mode (Online/Offline)" value={interviewData.mode} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="link" placeholder="Link (if Online)" value={interviewData.link} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
