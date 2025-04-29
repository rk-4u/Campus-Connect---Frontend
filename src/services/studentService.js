// src/services/studentService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs`, getAuthHeader());
  return res.data;
};

export const applyToJob = async (jobId, resumeFile) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);

  const token = localStorage.getItem('token');
  return axios.post(`${API_BASE}/applications/${jobId}/apply`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const getMyApplications = async () => {
  const res = await axios.get(`${API_BASE}/applications/my-applications`, getAuthHeader());
  return res.data;
};
