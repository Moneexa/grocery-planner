import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const IngredientBarChart = ({
  data,
}: {
  data: { ingredient: string; price: string }[];
}) => {
  const labels = data.map((item) => item.ingredient); // Ingredient names
  const counts = data.map((item) => item.price); // Ingredient counts
  console.log(labels);
  console.log(counts);

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
