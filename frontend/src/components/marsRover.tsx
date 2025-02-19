import Loader from '../ui-components/loader';
import useMarsRover from '../custom-hooks/useMarsRover';
import InputField from '../ui-components/inputField';
import FetchButton from '../ui-components/fetchButton';
import PhotoGrid from '../ui-components/photoGrid';
import PhotoModal from '../ui-components/photoModal';
import NoDataMessage from '../ui-components/noDataErrorMessage'; 

const MarsRover = () => {
  const {
    solInput,
    setSolInput,
    activeSol,
    photos,
    loading,
    error,
    hasMore,
    handleFetchPhotos,
    isButtonDisabled,
    showScroll,
    scrollToTop,
    selectedPhoto,
    setSelectedPhoto,
    formatDate,
  } = useMarsRover();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Mars Rover Photos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchPhotos();
        }}
        className="mb-4 flex items-center space-x-4"
      >
        <InputField
          id="sol"
          label="Select Mars Day (sol):"
          value={solInput}
          onChange={setSolInput}
          type="number"
          min="1"
        />
        <FetchButton disabled={isButtonDisabled} type="submit">
          Fetch Photos
        </FetchButton>
      </form>

      {error && <div className="text-red-500">{error}</div>}
      {loading && photos.length === 0 && <Loader />}

      {activeSol !== null && photos.length === 0 && !loading && <NoDataMessage />}

      {photos.length > 0 && (
        <PhotoGrid
          photos={photos}
          onPhotoClick={setSelectedPhoto}
          formatDate={formatDate}
        />
      )}

      {loading && photos.length > 0 && hasMore && <Loader />}
      {photos.length > 0 && !loading && !hasMore && (
        <div className="text-center py-4 text-white">
          No more photos to load.
        </div>
      )}

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          ↑
        </button>
      )}

      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
};

export default MarsRover;
