import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get auth headers
const getAuthConfig = (token) => {
  if (!token) {
    throw new Error('Session expired. Please login again.');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  };
};

// Centralized error handler
const handleApiError = (error) => {
  console.error('API Error:', error);

  if (error.response) {
    if (error.response.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(error.response?.data?.error || 'Unexpected server error');
  } else if (error.request) {
    throw new Error('No response from server. Please check your network.');
  } else {
    throw new Error(error.message || 'Unexpected error occurred.');
  }
};

// ✅ POST /api/company/jobs - Post a new job
export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/company/jobs`,
      jobData,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    console.error('Job posting failed:', error);
    handleApiError(error); // Centralized error handling
  }
};

// ✅ GET /api/company/jobs - Get company's jobs
export const getCompanyJobs = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/company/jobs`,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};

// ✅ GET /api/company/jobs/:jobId/applicants - View applicants for a job
export const viewApplicants = async (jobId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/company/jobs/${jobId}/applicants`,
      getAuthConfig(token)
    );

    return response.data || [];
  } catch (error) {
    handleApiError(error);
    return []; // fallback in case of error
  }
};

// ✅ Check if an interview is already scheduled
export const checkInterviewScheduled = async (applicationId, token) => {
  try {
    const res = await axios.get(
      `${API_URL}/interviews/check/${applicationId}`,
      getAuthConfig(token)
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ✅ Schedule a new interview
export const scheduleInterview = async (interviewData, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/interviews/`,
      interviewData,
      getAuthConfig(token)
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error; // rethrow for UI-level handling
  }
};

// ✅ GET /api/interviews - Get interviews for the logged-in company
export const getCompanyInterviews = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/interviews`,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};

// ✅ GET /api/company/stats - Get company statistics
export const getCompanyStats = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/company/stats`,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};
