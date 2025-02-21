import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import useNeoData from '../custom-hooks/useNeoData';

const LineChart = () => {
  const { neoData } = useNeoData();

  if (!neoData || neoData.length === 0) {
    return null;
  }

  const lineLabels = neoData.map((_, index) => `NEO ${index + 1}`);
  const averageDiameters = neoData.map((neo) => {
    const { estimated_diameter_min, estimated_diameter_max } =
      neo.estimated_diameter.kilometers;
    return (estimated_diameter_min + estimated_diameter_max) / 2;
  });

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

  return (
    <div className="relative" style={{ height: '300px', maxHeight: '400px' }}>
      <Line
        data={lineChartData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default LineChart;