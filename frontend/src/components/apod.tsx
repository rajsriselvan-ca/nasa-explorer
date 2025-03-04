import { useEffect, useState, useCallback } from 'react';
import { APODResponse } from '../types/apodResponse_types';
import { fetchAPOD } from '../api/nasaApi';
import Loader from '../ui-components/loader'; 
import ErrorFallback from '../error-handling/ErrorFallback'; 
import { formatDate } from '../helper-functions/formatDate';

const APOD = () => {
  const [data, setData] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch APOD data & Use useCallback to prevent re-creation of fetchData function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAPOD();
      setData(response);
    } catch (error) {
      setError(error as string); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader />; 
  }

  if (error) {
    return <ErrorFallback message={error} onRetry={fetchData} />;
  }

  if (!data) {
    return <div className="text-white">No data available.</div>;
  }

  const isYouTubeVideo = data.url.includes('youtube.com') || data.url.includes('youtu.be');

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      <p className="text-gray-300 mb-4">{data.explanation}</p>
      {data.media_type === 'image' ? (
        <img
          src={data.url}
          alt={data.title}
          className="w-full max-w-2xl rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full max-w-2xl rounded-lg shadow-md overflow-hidden">
          {isYouTubeVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(data.url)}`}
              title={data.title}
              className="w-full h-96"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls className="w-full h-96">
              <source src={data.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <p className="text-sm text-gray-400 mt-4">Date: {formatDate(data.date)}</p>
    </div>
  );
};

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

export default APOD;
