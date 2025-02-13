import { useEffect, useState } from 'react';
import axios from 'axios';
import {EPICResponse} from '../types/epicResponse_types';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const EPIC = () => {
  const [data, setData] = useState<EPICResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEPICData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
        );
        console.log('API Response:', response.data); 
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching EPIC data:', error);
        setError('Failed to fetch EPIC data. Please try again later.');
        setLoading(false);
      }
    };

    fetchEPICData();
  }, []);

  if (loading) {
    return <div>Loading EPIC images...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No EPIC images available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Earth Polychromatic Imaging Camera (EPIC)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => {
          // Extract year, month, and day from the date field
          const date = new Date(item.date);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
          const day = String(date.getUTCDate()).padStart(2, '0');
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

          return (
            <div key={item.identifier} className="border rounded-lg shadow-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={item.caption}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', imageUrl); 
                  e.currentTarget.src = 'path/to/fallback/image.png'; 
                }}
              />
              <div className="p-4">
                <p className="text-sm text-gray-600">{item.caption}</p>
                <p className="text-sm text-gray-500">Date: {item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EPIC;