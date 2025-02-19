import React from 'react';
import { motion } from 'framer-motion';
import { PhotoGridProps } from '../types/photoGridProps';

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick, formatDate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <motion.div
          key={`${photo.id}-${photo.earth_date}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.5,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          onClick={() => onPhotoClick(photo)}
          className="border rounded-lg shadow-lg overflow-hidden text-white bg-gradient-to-b from-gray-700 to-gray-900 cursor-pointer"
        >
          <img
            src={photo.img_src}
            alt={`Mars Rover - ${photo.camera.full_name}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">Camera: {photo.camera.full_name}</h3>
            <p>Earth Date: {formatDate(photo.earth_date)}</p>
            <p>Rover: {photo.rover.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGrid;
