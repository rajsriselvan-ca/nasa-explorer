import { useEffect, useState } from 'react';
import { fetchNeo } from '../api/nasaApi';
import {NeoData} from '../types/neoData_types';

const useNeoData = () => {
  const [neoData, setNeoData] = useState<NeoData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNeo()
      .then((data) => {
        setNeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching NEO data:', err);
        setError('Failed to fetch NEO data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return { neoData, loading, error };
};

export default useNeoData;