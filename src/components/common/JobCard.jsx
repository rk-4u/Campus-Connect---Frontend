import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, alreadyApplied }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-800">Description: {job.description}</p>

      {alreadyApplied ? (
        <p className="mt-4 text-green-600 font-semibold">Already Applied</p>
      ) : (
        <Link
          to={`/student/jobs/${job._id}/apply`}
          className="mt-4 block w-full bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700"
        >
          Apply Now
        </Link>
      )}
    </div>
  );
};

export default JobCard;
