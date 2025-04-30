import React, { useEffect, useState } from "react";
import { getPlacementDrives } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

const PlacementDrives = () => {
  const { token } = useAuth();
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const data = await getPlacementDrives(token);
        setDrives(data);
      } catch (error) {
        console.error("Error fetching placement drives:", error);
        setError("Error fetching placement drives.");
      } finally {
        setLoading(false);
      }
    };
    fetchDrives();
  }, [token]);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) return <div>Loading placement drives... Please wait.</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Placement Drives</h2>

      <ul>
        {drives.length > 0 ? (
          drives.map((drive) => (
            <li key={drive._id} className="border-b py-4">
              <h3 className="text-lg font-semibold">{drive.name}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(drive.startDate)} &rarr; {formatDate(drive.endDate)}
              </p>
              <p className="mt-1">{drive.description}</p>
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
