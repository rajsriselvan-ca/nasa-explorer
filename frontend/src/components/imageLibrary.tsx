import { useEffect, useState } from 'react';
import axios from 'axios';
import {ImageLibraryItem} from '../types/imageLibrary_types';

const ImageLibrary = () => {
  const [data, setData] = useState<ImageLibraryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageLibraryData = async () => {
      try {
        // Fetch the list of items
        const response = await axios.get(`https://images-api.nasa.gov/search?q=moon`);
        const items = response.data.collection.items;

        // Limit to top 10 items
        const top10Items = items.slice(0, 10);

        // Fetch media URLs for each of the top 10 items
        const itemsWithMedia = await Promise.all(
          top10Items.map(async (item: ImageLibraryItem) => {
            try {
              const mediaResponse = await axios.get(item.href);
              return {
                ...item,
                links: mediaResponse.data || [], 
              };
            } catch (error) {
              console.error('Error fetching media URLs:', error);
              return {
                ...item,
                links: [], 
              };
            }
          })
        );

        setData(itemsWithMedia);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Image Library data:', error);
        setError('Failed to fetch Image Library data. Please try again later.');
        setLoading(false);
      }
    };

    fetchImageLibraryData();
  }, []);

  if (loading) {
    return <div>Loading NASA Image & Video Library...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No images or videos available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">NASA Image & Video Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => {
          const mediaUrl = (item.links || [])
            .filter((link) => !link.href.endsWith('metadata.json')) // Exclude metadata files
            .find((link) => link.href.match(/\.(jpg|jpeg|png|gif|mp4|webm)$/i)) 
            ?.href;

          return (
            <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
              {mediaUrl ? (
                mediaUrl.match(/\.(mp4|webm)$/i) ? ( // Check if it's a video
                  <video controls className="w-full h-48 object-cover">
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={mediaUrl}
                    alt={item.data[0]?.title || 'NASA Media'}
                    className="w-full h-48 object-cover"
                  />
                )
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No media available</p>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold">{item.data[0]?.title}</h3>
                <p className="text-sm text-gray-600">{item.data[0]?.description}</p>
                <p className="text-sm text-gray-500">Date Created: {item.data[0]?.date_created}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageLibrary;