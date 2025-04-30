import React, { useState } from 'react';
import { createPlacementDrive } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const CreatePlacementDrive = () => {
  const { token } = useAuth();

  const [driveData, setDriveData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setDriveData({ ...driveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      await createPlacementDrive(driveData, token);
      setStatus({ type: 'success', message: 'Placement drive created successfully!' });
      setDriveData({ name: '', startDate: '', endDate: '', description: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to create placement drive.',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Placement Drive</h2>

      {status.message && (
        <div
          className={`p-3 rounded mb-4 ${
            status.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Drive Name
          </label>
          <input
            type="text"
            name="name"
            value={driveData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={driveData.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={driveData.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={driveData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Drive Description"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Drive
        </button>
      </form>
    </div>
  );
};

export default CreatePlacementDrive;
