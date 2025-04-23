import React, { useState } from 'react';
import { createPlacementDrive } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [driveData, setDriveData] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    setDriveData({ ...driveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlacementDrive(driveData, token);
      alert('Placement drive created successfully!');
      setDriveData({ title: '', date: '', description: '' });
    } catch (error) {
      alert('Error creating placement drive: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Placement Drive</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={driveData.title}
          onChange={handleChange}
          placeholder="Drive Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={driveData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={driveData.description}
          onChange={handleChange}
          placeholder="Drive Description"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Drive
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
