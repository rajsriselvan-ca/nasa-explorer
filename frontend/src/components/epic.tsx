import { useEffect } from 'react';
import Loader from '../ui-components/loader'; 
import NoDataErrorMessage from '../ui-components/noDataErrorMessage';
import { useEPIC } from '../custom-hooks/useEpic';
import DateSelector from '../ui-components/dateSelector';
import EpicDataSlide from '../ui-components/epicDataSlide';

const EPIC = () => {
  const {
    data,
    loading,
    error,
    currentIndex,
    selectedDate,
    setSelectedDate,
    imageError,
    setImageError,
    nextSlide,
    prevSlide,
  } = useEPIC();

  // Keyboard navigation using the native KeyboardEvent type
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-1xl text-white font-bold">
        Earth Polychromatic Imaging Camera (EPIC)
      </h2>
      <DateSelector 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !data || data.length === 0 ? (
        <NoDataErrorMessage />
      ) : (
        // EPIC photo slide Component
        <EpicDataSlide
          data={data}
          currentIndex={currentIndex}
          imageError={imageError}
          setImageError={setImageError}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      )}
    </div>
  );
};

export default EPIC;
