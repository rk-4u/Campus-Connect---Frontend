// src/components/common/ApplicationCard.jsx
import React from 'react';

const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
      <p className="text-gray-600">Applied on: {new Date(application.dateApplied).toLocaleDateString()}</p>
      <p className="text-gray-800">Status: {application.status}</p>
    </div>
  );
};

export default ApplicationCard;
