import { motion } from 'framer-motion';
import Loader from '../ui-components/loader';
import LineChart from '../ui-components/lineChart';
import BarChart from '../ui-components/barChart';
import PieChart from '../ui-components/pieChart';
import useNeoData from '../custom-hooks/useNeoData';

const Charts = () => {
  const { loading, error } = useNeoData();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  // Animation settings for hover effect
  const hoverAnimation = {
    scale: 1.03,
    translateY: -5,
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  };

  return (
    <div className="max-w-full mx-auto">
      <h1 className="text-2xl sm:text-3xl pt-3 text-white font-bold text-center mb-6 sm:mb-8">
        NeoWs (Near Earth Object Web Service)
      </h1>
      <div className="grid gap-6">
        <motion.div
          className="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer"
          whileHover={hoverAnimation}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Estimated Diameter Trend</h2>
          <LineChart />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Diameter Distribution</h2>
            <BarChart />
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow p-4 sm:p-6 cursor-pointer"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Hazardous vs. Non-Hazardous</h2>
            <PieChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Charts;