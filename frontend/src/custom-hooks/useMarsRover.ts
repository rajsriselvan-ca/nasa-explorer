import { useState, useEffect } from 'react';
import { MarsRoverPhoto } from '../types/marsRoverPhoto_types';
import { fetchMarsRoverPhotos } from '../api/nasaApi';
import useInfiniteScroll from './useInfiniteScroll';

const useMarsRover = () => {
  const [solInput, setSolInput] = useState('1000');
  const [activeSol, setActiveSol] = useState<number | null>(null);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<MarsRoverPhoto | null>(null);

  // Function to fetch photos for the current activeSol and page.
  const fetchPhotos = async (page: number) => {
    if (activeSol === null) return [];
    const response = await fetchMarsRoverPhotos(activeSol, page, 10);
    return response;
  };

  // Use the infinite scroll hook to handle data fetching and pagination.
  const { data: photos, loading, error, hasMore, reset, setPage } = useInfiniteScroll<MarsRoverPhoto>(
    fetchPhotos,
    { trigger: fetchEnabled, sol: activeSol }
  );

  /**
   * Handles the fetch request when the user submits the form.
   * Validates input, resets previous data, and enables fetching.
   */
  const handleFetchPhotos = () => {
    if (!solInput.trim() || Number(solInput) < 1) {
      alert('Please enter a valid positive integer for Sol');
      return;
    }
    setActiveSol(Number(solInput));
    reset();
    setPage(1);
    setFetchEnabled(true);
  };

  // Disable scrolling while data is loading.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  // Determine if the sol input is valid and if the fetch button should be disabled.
  const isValidInput = solInput.trim() !== '' && Number(solInput) >= 1;
  const isButtonDisabled = !isValidInput || (activeSol !== null && activeSol.toString() === solInput);

  // Listen for scroll events to toggle the scroll-to-top button.
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for arrow key navigation to change the selected photo in the modal.
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
      if (e.key === 'ArrowRight') {
        const nextIndex = currentIndex + 1;
        if (nextIndex < photos.length) {
          setSelectedPhoto(photos[nextIndex]);
        }
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          setSelectedPhoto(photos[prevIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, photos]);

  // Smoothly scroll to the top of the page.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format a date string from 'YYYY-MM-DD' to 'DD-MM-YYYY'.
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  return {
    solInput,
    setSolInput,
    activeSol,
    fetchEnabled,
    setFetchEnabled,
    showScroll,
    selectedPhoto,
    setSelectedPhoto,
    photos,
    loading,
    error,
    hasMore,
    handleFetchPhotos,
    isButtonDisabled,
    scrollToTop,
    formatDate,
  };
};

export default useMarsRover;
