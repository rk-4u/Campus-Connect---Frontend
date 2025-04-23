import axios from 'axios';

const API_URL = 'https://clg-placementproject-backend.onrender.com/api';

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
    throw error.response?.data || error.message;
  }
};

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
