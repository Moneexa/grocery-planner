import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Button, Empty, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { usePromise } from '../../../../shared/hooks';
import { getInsights } from '../../../../shared/apis';
import { PlusOutlined } from '@ant-design/icons';

const IngredientBarChart = () => {
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
  const { barChartData } = response.data;
  if (barChartData.length == 0) {
    return (
      <Flex align="center" justify="center" vertical gap={10}>
        <Empty description="You have not bought groceries for the current plan, please add one." />
        <Button type="primary" icon={<PlusOutlined />} size="large">
          <Link to="/app/groceries/add">Add Meal</Link>
        </Button>
      </Flex>
    );
  }
  const labels = barChartData.map(
    (item: { ingredient: string; price: number }) => item.ingredient,
  ); // Ingredient names
  const counts = barChartData.map(
    (item: { ingredient: string; price: number }) => item.price,
  ); // Ingredient counts

  const chartData = {
    labels,
    axis: 'y',
    datasets: [
      {
        label: 'Ingredient Distribution',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: false, text: 'Price in Nok' } },
      y: {
        title: { display: true, text: 'Ingredients' },
        beginAtZero: true,
      },
    },
  };

  return <Bar height={200} data={chartData} options={options} />;
};

export default IngredientBarChart;
