import { useEffect, useState, useRef } from 'react';
import { EPICResponse } from '../types/epicResponse_types';
import { FaInfoCircle } from 'react-icons/fa';
import { fetchEPIC } from '../api/nasaApi'; 

const EPIC = () => {
  const [data, setData] = useState<EPICResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEPIC()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching EPIC data:', error);
        setError('Failed to fetch EPIC data. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowDescription(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  }, [currentIndex, data]); 

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.length || 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (data?.length || 1)) % (data?.length || 1));
  };

  if (loading) {
    return <div>Loading EPIC images...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No EPIC images available.</div>;
  }

  const currentItem = data[currentIndex];
  const date = new Date(currentItem.date);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${currentItem.image}.png`;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-1xl text-white font-bold">
        Earth Polychromatic Imaging Camera (EPIC)
      </h2>
      <div className="relative w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={currentItem.caption}
            className="w-full h-auto object-contain"
            onError={(e) => {
              console.error("Image failed to load:", imageUrl);
              e.currentTarget.src = "path/to/fallback/image.png";
            }}
          />

          <div ref={infoRef} className="absolute top-2 right-2">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              <FaInfoCircle size={20} />
            </button>
            {showDescription && (
              <div className="absolute right-0 mt-2 w-64 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                <p className="text-sm">{currentItem.caption}</p>
                <p className="text-sm">Date: {currentItem.date}</p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-4 hover:bg-opacity-75 transition-all hover:scale-105 active:scale-95 active:shadow-inner"
          style={{ fontSize: "24px" }}
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-4 hover:bg-opacity-75 transition-all hover:scale-105 active:scale-95 active:shadow-inner"
          style={{ fontSize: "24px" }}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default EPIC;