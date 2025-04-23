// src/components/common/JobCard.jsx
import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-800">Description: {job.description}</p>
    </div>
  );
};

export default JobCard;
