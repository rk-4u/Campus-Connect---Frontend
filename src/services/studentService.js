// src/services/studentService.js
import axios from 'axios';

const API_BASE = 'https://clg-placementproject-backend.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs`, getAuthHeader());
  return res.data;
};

export const applyToJob = async (jobId) => {
  const res = await axios.post(`${API_BASE}/applications/${jobId}/apply`, {}, getAuthHeader());
  return res.data;
};

export const getMyApplications = async () => {
  const res = await axios.get(`${API_BASE}/applications/my-applications`, getAuthHeader());
  return res.data;
};
