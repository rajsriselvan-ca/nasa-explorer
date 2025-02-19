import React from 'react';

interface EpicNavigationButtonsProps {
  nextSlide: () => void;
  prevSlide: () => void;
}

const EpicNavigationButtons: React.FC<EpicNavigationButtonsProps> = ({
  nextSlide,
  prevSlide,
}) => {
  return (
    <>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-4 hover:bg-opacity-75 transition-all hover:scale-105 active:scale-95 active:shadow-inner"
        style={{ fontSize: '24px' }}
      >
        &larr;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-4 hover:bg-opacity-75 transition-all hover:scale-105 active:scale-95 active:shadow-inner"
        style={{ fontSize: '24px' }}
      >
        &rarr;
      </button>
    </>
  );
};

export default EpicNavigationButtons;
