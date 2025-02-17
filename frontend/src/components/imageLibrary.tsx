import { useEffect, useState } from 'react';
import { BarChart, ScatterChart, LineChart, DoughnutChart, RadarChart, Heatmap } from '../ui-components/charts';
import { motion } from 'framer-motion';
import { NeoData } from '../types/neoData_types';
import { fetchNeo } from '../api/nasaApi'; 

const NeoVisualization = () => {
  const [neoData, setNeoData] = useState<NeoData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNeo()
      .then((response) => {
        setNeoData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching NEO data:', error);
        setError('Failed to fetch NEO data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading NEO data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!neoData || neoData.length === 0) {
    return <div>No NEO data available.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Near Earth Objects (NEO) Visualization</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }} 
            whileTap={{ scale: 0.95 }} 
            transition={{ type: 'spring', stiffness: 300 }} 
          >
            <h3 className="text-lg font-semibold mb-4">Asteroid Size Distribution</h3>
            <BarChart data={neoData} />
          </motion.div>

          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold mb-4">Velocity vs. Miss Distance</h3>
            <ScatterChart data={neoData} />
          </motion.div>

          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold mb-4">Close Approaches Over Time</h3>
            <LineChart data={neoData} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold mb-4">Hazardous vs. Non-Hazardous</h3>
            <DoughnutChart data={neoData} />
          </motion.div>

          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold mb-4">Asteroid Radar</h3>
            <RadarChart data={neoData} />
          </motion.div>

          <motion.div
            className="bg-gray-50 p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold mb-4">Heatmap of Close Approaches</h3>
            <Heatmap data={neoData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NeoVisualization;