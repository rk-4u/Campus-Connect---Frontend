import React, { useState } from 'react';
import { scheduleInterview } from '../../services/companyService';
import { useAuth } from '../../context/AuthContext';

const ScheduleInterview = ({ jobId, studentId, applicationId, onClose, onScheduled }) => {
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    date: '',
    time: '',
    type: 'in-person',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const combinedDate = new Date(`${form.date}T${form.time}`);
    if (isNaN(combinedDate.getTime())) {
      setError('Please provide a valid date and time.');
      setLoading(false);
      return;
    }
  
    const isoDateTime = combinedDate.toISOString();
  
    const payload = {
      application: applicationId,
      company: user._id,
      student: studentId,
      type: form.type,
      startTime: isoDateTime, // Change dateTime to startTime here
      duration: 30,
      location: form.location,
      status: 'scheduled',
      scheduledBy: user._id
    };
    try {
      await scheduleInterview(payload, token);
      alert('Interview scheduled!');
      onScheduled();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to schedule.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t pt-4">
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" name="time" value={form.time} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="in-person">In-Person</option>
          <option value="virtual">Virtual</option>
        </select>
      </div>
      {form.type === 'in-person' ? (
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
      ) : null}

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? 'Scheduling...' : 'Confirm'}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ScheduleInterview;
