import React, { useEffect, useState } from 'react';
import { getPlacementDrives } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const PlacementDrives = () => {
  const { token } = useAuth(); // Get the token from the context
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const data = await getPlacementDrives(token); // Pass the token here
        setDrives(data);
      } catch (error) {
        console.error("Error fetching placement drives:", error); // Log error for debugging
        setError('Error fetching placement drives.');
      } finally {
        setLoading(false);
      }
    };
    fetchDrives();
  }, [token]); // Make sure to include token in the dependency array

  if (loading) return <div>Loading placement drives... Please wait.</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Placement Drives</h2>
      <ul>
        {drives.length > 0 ? (
          drives.map(drive => (
            <li key={drive._id} className="border-b py-2">
              <h3 className="text-lg font-semibold">{drive.name}</h3>
              <p>{drive.description}</p>
              {/* More details as required */}
            </li>
          ))
        ) : (
          <p>No placement drives available.</p>
        )}
      </ul>
    </div>
  );
};

export default PlacementDrives;
