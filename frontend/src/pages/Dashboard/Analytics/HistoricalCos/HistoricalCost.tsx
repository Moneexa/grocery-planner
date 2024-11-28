import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Button, Empty, Flex } from 'antd';
import { usePromise } from '../../../../shared/hooks';
import { getInsights } from '../../../../shared/apis';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PlanCostLineChart = () => {
  const response = usePromise(getInsights);
  if (response.status === 'loading') return '...Loading';
  if (response.status === 'error')
    return (
      <Flex align="center" justify="center" vertical gap={10}>
        <Empty description="You have no plans added, please add one." />
        <Button type="primary" icon={<PlusOutlined />} size="large">
          <Link to="/app/meal-schedule/add">Add Meal</Link>
        </Button>
      </Flex>
    );
  const { lineChartData } = response.data;

  const chartData = {
    labels: lineChartData.map((item) =>
      dayjs(item.date).format('MMM DD, YYYY'),
    ),
    datasets: [
      {
        label: 'Plan Costs (NOK)',
        data: lineChartData.map((item) => item.cost),
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
