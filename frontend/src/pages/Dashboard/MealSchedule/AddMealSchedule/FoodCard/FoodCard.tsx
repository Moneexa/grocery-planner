import { Card } from 'antd';
import { Food, Recipe } from '../../../../../types';
import { useContext } from 'react';
import { PlanContext } from '../../../../../store/PlanProvider';

const { Meta } = Card;

function FoodCard({
  food,
  category,
  date,
}: {
  food: Food;
  category: Exclude<keyof Recipe, 'date'>;
  date: number;
}) {
  const { addFood } = useContext(PlanContext);

  return (
    <Card
      hoverable
      style={{ width: '150px' }}
      cover={<img alt="example" src={food.imageUrl} />}
      onClick={() => addFood(food, date, category)}
    >
      <Meta title={food.id} description={food.timeTaken} />
    </Card>
  );
}

export default FoodCard;
