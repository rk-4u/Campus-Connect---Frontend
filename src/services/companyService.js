import axios from 'axios';

const API_URL = 'https://clg-placementproject-backend.onrender.com/api';

// Auth header helper
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// ✅ POST /api/company/jobs - Create a new job
export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post(`${API_URL}/company/jobs`, jobData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ GET /api/company/jobs/:jobId/applicants - View applicants for a job
export const viewApplicants = async (jobId, token) => {
  try {
    const response = await axios.get(`${API_URL}/company/jobs/${jobId}/applicants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ POST /api/interviews/schedule - Schedule an interview
export const scheduleInterview = async (interviewData, token) => {
  try {
    const response = await axios.post(`${API_URL}/interviews/schedule`, interviewData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ GET /api/interviews - Get interviews for the logged-in company
export const getCompanyInterviews = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/interviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
