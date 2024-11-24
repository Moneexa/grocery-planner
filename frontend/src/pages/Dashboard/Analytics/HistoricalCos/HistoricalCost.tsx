import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

const PlanCostLineChart = ({
  data,
}: {
  data: {
    planName: string;
    date: number;
    cost: number;
  }[];
}) => {
  const chartData = {
    labels: data.map((item) => dayjs(item.date).format('MMM DD, YYYY')),
    datasets: [
      {
        label: 'Plan Costs (NOK)',
        data: data.map((item) => item.cost),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: {
        title: { display: true, text: 'Cost (NOK)' },
        beginAtZero: true,
      },
    },
  };

  return <Line height={200} data={chartData} options={options} />;
};

export default PlanCostLineChart;
