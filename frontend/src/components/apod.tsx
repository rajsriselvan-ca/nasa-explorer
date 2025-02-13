import { useEffect, useState } from 'react';
import axios from 'axios';
import {APODResponse} from '../types/apodResponse_types';


const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const APOD = () => {
  const [data, setData] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching APOD data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  // Check if the URL is a YouTube video
  const isYouTubeVideo = data.url.includes('youtube.com') || data.url.includes('youtu.be');

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
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
            // Embed YouTube video using the YouTube iframe API
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(data.url)}`}
              title={data.title}
              className="w-full h-96"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Fallback to a generic video player
            <video controls className="w-full h-96">
              <source src={data.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <p className="text-sm text-gray-400 mt-4">Date: {data.date}</p>
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