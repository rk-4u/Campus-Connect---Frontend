// src/services/adminService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create Placement Drive
export const createPlacementDrive = async (driveData, token) => {
  try {
    const response = await axios.post(`${API_URL}/admin/drives`, driveData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message);
  }
};


// Fetching Placement Drives
export const getPlacementDrives = async (token) => { // Accepting the token here
  try {
    const response = await axios.get(`${API_URL}/admin/drives`, {
      headers: { Authorization: `Bearer ${token}` }, // Add Authorization header here
    });
    return response.data; // Returns the list of drives
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetching Placement Stats
export const getPlacementStats = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
