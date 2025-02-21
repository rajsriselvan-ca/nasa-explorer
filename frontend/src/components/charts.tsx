import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchNeo } from '../api/nasaApi'; 
import { motion } from 'framer-motion';
import Loader from '../ui-components/loader'; 

type NeoData = {
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
};

const Charts = () => {
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

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }
  if (!neoData || neoData.length === 0) {
    return <div className="p-8">No NEO data available.</div>;
  }

  const lineLabels = neoData.map((_, index) => `NEO ${index + 1}`);

  // Calculate the average estimated diameter for each NEO
  const averageDiameters = neoData.map((neo) => {
    const { estimated_diameter_min, estimated_diameter_max } =
      neo.estimated_diameter.kilometers;
    return (estimated_diameter_min + estimated_diameter_max) / 2;
  });

  // Create a histogram for the distribution of average diameters
  let bucketLessThan0_1 = 0;
  let bucket0_1to0_5 = 0;
  let bucket0_5to1 = 0;
  let bucketAbove1 = 0;
  averageDiameters.forEach((diameter) => {
    if (diameter < 0.1) {
      bucketLessThan0_1++;
    } else if (diameter < 0.5) {
      bucket0_1to0_5++;
    } else if (diameter < 1) {
      bucket0_5to1++;
    } else {
      bucketAbove1++;
    }
  });
  const barLabels = ['<0.1 km', '0.1-0.5 km', '0.5-1 km', '1+ km'];
  const barDataValues = [bucketLessThan0_1, bucket0_1to0_5, bucket0_5to1, bucketAbove1];

  // Count hazardous vs. non-hazardous NEOs
  const hazardousCount = neoData.filter((neo) => neo.is_potentially_hazardous_asteroid).length;
  const nonHazardousCount = neoData.length - hazardousCount;

  // Prepare Chart.js data objects
  const lineChartData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Average Diameter (km)',
        data: averageDiameters,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2,
      },
    ],
  };

  const barChartData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Number of NEOs',
        data: barDataValues,
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Hazardous', 'Non-Hazardous'],
    datasets: [
      {
        data: [hazardousCount, nonHazardousCount],
        backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 1,
      },
    ],
  };

  // Animation settings for hover effect
  const hoverAnimation = {
    scale: 1.03,
    translateY: -5,
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto grid gap-6">
        <motion.div
          className="bg-white rounded-lg shadow p-6 cursor-pointer"
          whileHover={hoverAnimation}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Estimated Diameter Trend</h2>
          <div className="relative" style={{ height: '400px' }}>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="bg-white rounded-lg shadow p-6 cursor-pointer"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Diameter Distribution</h2>
            <div className="relative" style={{ height: '300px' }}>
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>

         
          <motion.div
            className="bg-white rounded-lg shadow p-6 cursor-pointer"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Hazardous vs. Non-Hazardous</h2>
            <div className="relative" style={{ height: '300px' }}>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
