import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoModalProps } from '../types/photoModalProps';

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-x-0 top-20 bottom-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white text-2xl z-10"
            >
              &times;
            </button>
            <motion.img
              src={photo.img_src}
              alt={`Mars Rover - ${photo.camera.full_name}`}
              className="max-w-[90%] md:max-w-3xl w-full h-auto object-contain max-h-[80vh]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoModal;
