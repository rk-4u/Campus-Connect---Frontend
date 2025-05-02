// src/services/studentService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

// 📌 Public: Fetch all placement drives (no auth required)
export const getPlacementDrives = async () => {
  const res = await axios.get(`${API_BASE}/drives`);
  return res.data;
};

// 🔐 Authenticated: Fetch all jobs
export const getAllJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs`, getAuthHeader());
  return res.data;
};

// 🔐 Authenticated: Apply to a job with resume
export const applyToJob = async (jobId, resumeFile) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);

  return axios.post(`${API_BASE}/applications/${jobId}/apply`, formData, {
    ...getAuthHeader(),
    headers: {
      ...getAuthHeader().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 🔐 Authenticated: Get student's job applications
export const getMyApplications = async () => {
  const res = await axios.get(`${API_BASE}/applications/my-applications`, getAuthHeader());
  return res.data;
};
