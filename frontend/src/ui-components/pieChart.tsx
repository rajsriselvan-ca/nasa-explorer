import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import useNeoData from '../custom-hooks/useNeoData';

const PieChart = () => {
  const { neoData } = useNeoData();

  if (!neoData || neoData.length === 0) {
    return null;
  }

  const hazardousCount = neoData.filter((neo) => neo.is_potentially_hazardous_asteroid).length;
  const nonHazardousCount = neoData.length - hazardousCount;

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

  return (
    <div className="relative" style={{ height: '250px', maxHeight: '300px' }}>
      <Pie
        data={pieChartData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default PieChart;