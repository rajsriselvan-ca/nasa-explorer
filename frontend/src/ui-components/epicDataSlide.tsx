import React, { useRef, useState, useEffect } from 'react';
import { EpicDataSlideProps } from '../types/epicDateSlideProps';
import EpicInfoButton from './epicInfoButton';
import EpicNavigationButtons from './epicNavigationButtons';

const EpicDataSlide: React.FC<EpicDataSlideProps> = ({
  data,
  currentIndex,
  imageError,
  setImageError,
  nextSlide,
  prevSlide,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  // Use a ref for the info button container to detect outside clicks
  const infoRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);

  // Hide description when clicking outside the info block
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowDescription(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {imageError ? (
          <div className="w-full h-64 flex items-center justify-center text-white">
            <img
              src="/assets/images/no_image.jpg"
              alt="No image available"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <img
            ref={imageRef}
            src={(() => {
              const currentItem = data[currentIndex];
              const dateObj = new Date(currentItem.date);
              const year = dateObj.getUTCFullYear();
              const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
              const day = String(dateObj.getUTCDate()).padStart(2, '0');
              return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${currentItem.image}.png`;
            })()}
            alt={data[currentIndex].caption}
            className="w-full h-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/no_image.jpg";
              setImageError(true);
            }}
          />
        )}
        <EpicInfoButton
          ref={infoRef}
          showDescription={showDescription}
          setShowDescription={setShowDescription}
          caption={data[currentIndex].caption}
          date={data[currentIndex].date}
        />
      </div>
      <EpicNavigationButtons nextSlide={nextSlide} prevSlide={prevSlide} />
    </div>
  );
};

export default EpicDataSlide;
