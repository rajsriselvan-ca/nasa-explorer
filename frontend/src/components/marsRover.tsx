import { useEffect, useState } from 'react';
import { MarsRoverPhoto } from '../types/marsRoverPhoto_types';
import { motion } from 'framer-motion';
import { fetchMarsRoverPhotos } from '../api/nasaApi';
import Loader from '../ui-components/loader'; 

const MarsRover = () => {
  const [photos, setPhotos] = useState<MarsRoverPhoto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchMarsRoverPhotos()
      .then((response) => {
        setPhotos(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Mars Rover Photos:', error);
        setError('Failed to fetch Mars Rover photos. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />; // Replace with the Loader component
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
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarsRover;