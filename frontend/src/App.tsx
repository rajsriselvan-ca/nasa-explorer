import { useEffect, useState } from "react";

interface ApodPhoto {
  title: string;
  url: string;
  explanation: string;
  date: string;
}

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY; 

function App() {
  const [photos, setPhotos] = useState<ApodPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NASA APOD images:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">NASA Astronomy Pictures</h1>

      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
              <img src={photo.url} alt={photo.title} className="w-full h-auto rounded-lg" />
              <p className="text-gray-700 mt-2">{photo.explanation.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500 mt-2">📅 {photo.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
