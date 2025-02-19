import { useState, useEffect } from 'react';
import { MarsRoverPhoto } from '../types/marsRoverPhoto_types';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMarsRoverPhotos } from '../api/nasaApi';
import Loader from '../ui-components/loader';
import useInfiniteScroll from '../custom-hooks/useInfiniteScroll';

const MarsRover = () => {
  // Use a string state for the input so the user can clear it completely.
  const [solInput, setSolInput] = useState('1000');
  // activeSol is used to actually fetch data. (null means no fetch yet)
  const [activeSol, setActiveSol] = useState<number | null>(null);
  // When true, fetching is enabled.
  const [fetchEnabled, setFetchEnabled] = useState(false);
  // State to show/hide the scroll-to-top button.
  const [showScroll, setShowScroll] = useState(false);
  // State to track the currently selected photo for the modal.
  const [selectedPhoto, setSelectedPhoto] = useState<MarsRoverPhoto | null>(null);

  // This function runs only when activeSol is set.
  const fetchPhotos = async (page: number) => {
    if (activeSol === null) return [];
    const response = await fetchMarsRoverPhotos(activeSol, page, 10);
    return response;
  };

  // Pass our fetchEnabled flag and activeSol to the hook.
  const { data: photos, loading, error, hasMore, reset, setPage } = useInfiniteScroll<MarsRoverPhoto>(
    fetchPhotos,
    { trigger: fetchEnabled, sol: activeSol }
  );

  // When the user submits the form, update activeSol,
  // reset previous data, and enable fetching.
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

  const isValidInput = solInput.trim() !== '' && Number(solInput) >= 1;
  const isButtonDisabled = !isValidInput || (activeSol !== null && activeSol.toString() === solInput);

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Arrow key navigation: update selectedPhoto based on left/right keys
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Mars Rover Photos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchPhotos();
        }}
        className="mb-4 flex items-center"
      >
        <label htmlFor="sol" className="mr-2 text-white">
          Select Mars Day (sol):
        </label>
        <input
          type="number"
          id="sol"
          min="1"
          value={solInput}
          onChange={(e) => setSolInput(e.target.value)}
          className="border rounded p-2 bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`ml-2 px-4 py-2 rounded ${
            isButtonDisabled
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-300'
          }`}
        >
          Fetch Photos
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}
      {loading && photos.length === 0 && <Loader />}

      {activeSol !== null && !loading && photos.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/images/no_data.jpg" alt="No data found" className="w-64 h-auto" />
          <p className="text-white mt-2">No photos available. Click "Fetch Photos" to load.</p>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={`${photo.id}-${photo.earth_date}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPhoto(photo)}
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
      )}

      {loading && photos.length > 0 && hasMore && <Loader />}
      {activeSol !== null && !loading && photos.length > 0 && !hasMore && (
        <div className="text-center py-4 text-white">No more photos to load.</div>
      )}

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          ↑
        </button>
      )}

      {/* Modal displaying only the image with a matte black transparent background and close button */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-x-0 top-20 bottom-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80"
          >
            <div onClick={(e) => e.stopPropagation()} className="relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 text-white text-2xl z-10"
              >
                &times;
              </button>
              <motion.img
                src={selectedPhoto.img_src}
                alt={`Mars Rover - ${selectedPhoto.camera.full_name}`}
                className="max-w-[90%] md:max-w-3xl w-full h-auto object-contain max-h-[80vh]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarsRover;
