import axios from 'axios';

const API_URL = 'https://clg-placementproject-backend.onrender.com/api';

// Function to get authentication configuration with token
const getAuthConfig = (token) => {
  if (!token) {
    console.warn('No authentication token available');
    throw new Error('Your session has expired. Please login again.');
  }
  
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    timeout: 10000
  };
};

// Centralized error handling
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Response received, but the server returned an error status
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    
    if (error.response.status === 401) {
      throw new Error('Session expired. Please login again.');
    }

    throw new Error(error.response?.data?.message || 'An unexpected error occurred. Please try again later.');
  } else if (error.request) {
    // Request was made but no response received
    console.error('Request data:', error.request);
    throw new Error('No response from server. Please check your internet connection or try again later.');
  } else {
    // Something else went wrong
    console.error('Error message:', error.message);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};

// ✅ POST /api/company/jobs - Post a new job
export const postJob = async (jobData, token) => {
  try {
    console.log('Attempting to post job with token:', token ? 'exists' : 'missing');
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
    if (!token) {
      console.warn('No authentication token found.');
      throw new Error('Session expired. Please login again.');
    }

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
    if (!token) {
      console.warn('No authentication token found.');
      throw new Error('Session expired. Please login again.');
    }

    const response = await axios.get(
      `${API_URL}/company/jobs/${jobId}/applicants`,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};

// ✅ POST /api/interviews/schedule - Schedule an interview
export const scheduleInterview = async (interviewData, token) => {
  try {
    if (!token) {
      console.warn('No authentication token found.');
      throw new Error('Session expired. Please login again.');
    }

    const response = await axios.post(
      `${API_URL}/interviews/schedule`, 
      interviewData, 
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};

// ✅ GET /api/interviews - Get interviews for the logged-in company
export const getCompanyInterviews = async (token) => {
  try {
    if (!token) {
      console.warn('No authentication token found.');
      throw new Error('Session expired. Please login again.');
    }

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
    if (!token) {
      console.warn('No authentication token found.');
      throw new Error('Session expired. Please login again.');
    }

    const response = await axios.get(
      `${API_URL}/company/stats`,
      getAuthConfig(token)
    );
    return response.data;
  } catch (error) {
    handleApiError(error); // Centralized error handling
  }
};
