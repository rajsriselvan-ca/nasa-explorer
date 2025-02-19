import { useState, useEffect } from 'react';
import { EPICResponse } from '../types/epicResponse_types';
import { fetchEPIC } from '../api/nasaApi';

export const useEPIC = () => {
  const [data, setData] = useState<EPICResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [imageError, setImageError] = useState(false);

  // Fetch data whenever the selected date changes
  useEffect(() => {
    setLoading(true);
    // Reset the image error when a new date is selected
    setImageError(false);
    fetchEPIC(selectedDate || undefined)
      .then((response) => {
        setData(response);
        setCurrentIndex(0); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching EPIC data:', error);
        setError('Failed to fetch EPIC data. Please try again later.');
        setLoading(false);
      });
  }, [selectedDate]);

  const nextSlide = () => {
    if (data && data.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      // Reset image error on slide change
      setImageError(false);
    }
  };

  const prevSlide = () => {
    if (data && data.length) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
      setImageError(false);
    }
  };

  return {
    data,
    loading,
    error,
    currentIndex,
    setCurrentIndex,
    selectedDate,
    setSelectedDate,
    imageError,
    setImageError,
    nextSlide,
    prevSlide,
  };
};
