import { useEffect, useState } from 'react';
import axios from 'axios';
import {MarsRoverPhoto} from '../types/marsRoverPhoto_types';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const MarsRover = () => {
  const [photos, setPhotos] = useState<MarsRoverPhoto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
        );
        setPhotos(response.data.photos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Mars Rover Photos:', error);
        setError('Failed to fetch Mars Rover photos. Please try again later.');
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div>Loading Mars Rover photos...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!photos || photos.length === 0) {
    return <div>No photos available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mars Rover Photos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border rounded-lg shadow-lg overflow-hidden text-black bg-gradient-to-b from-white to-gray-400"
          >
            <img
              src={photo.img_src}
              alt={`Mars Rover - ${photo.camera.full_name}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Camera: {photo.camera.full_name}</h3>
              <p>Earth Date: {photo.earth_date}</p>
              <p>Rover: {photo.rover.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRover;