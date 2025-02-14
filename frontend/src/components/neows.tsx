import { useEffect, useState } from 'react';
import axios from 'axios';
import {NeoData} from '../types/neoData_types';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const NeoWs = () => {
  const [data, setData] = useState<Record<string, NeoData[]> | null>(null);

  useEffect(() => {
    axios.get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`)
      .then(response => setData(response.data.near_earth_objects))
      .catch(error => console.error("Error fetching NeoWs data:", error));
  }, []);

  return (
    <div>
      <h2>Near-Earth Objects</h2>
      {data ? Object.keys(data).map(date => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {data[date]?.map((obj: NeoData) => (
              <li key={obj.id}>
                <strong>{obj.name}</strong> <br />
                Diameter: {obj.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km <br />
                Hazardous: {obj.is_potentially_hazardous_asteroid ? 'Yes' : 'No'} <br />
                Close Approach Date: {obj.close_approach_data[0]?.close_approach_date} <br />
                Velocity: {obj.close_approach_data[0]?.relative_velocity.kilometers_per_hour} km/h <br />
                Miss Distance: {obj.close_approach_data[0]?.miss_distance.kilometers} km
              </li>
            ))}
          </ul>
        </div>
      )) : <p>Loading...</p>}
    </div>
  );
};

export default NeoWs;
