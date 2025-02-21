import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import useNeoData from '../custom-hooks/useNeoData';

const BarChart = () => {
  const { neoData } = useNeoData();

  if (!neoData || neoData.length === 0) {
    return null;
  }

  const averageDiameters = neoData.map((neo) => {
    const { estimated_diameter_min, estimated_diameter_max } =
      neo.estimated_diameter.kilometers;
    return (estimated_diameter_min + estimated_diameter_max) / 2;
  });

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

  return (
    <div className="relative" style={{ height: '250px', maxHeight: '300px' }}>
      <Bar
        data={barChartData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarChart;