import { Card } from 'antd';
import { Food, Recipe } from '../../../../../types';
import { useContext, useMemo } from 'react';
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
  const { plan, addFood } = useContext(PlanContext);
  const isSelected = useMemo(() => {
    const recipe = plan.recipes.find((recipe) => recipe.date === date);
    if (!recipe) return false;
    return recipe[category]?.id === food.id;
  }, [plan.recipes, category, food.id, date]);
  return (
    <Card
      hoverable
      style={{ width: '150px', background: isSelected ? '#3aafdc' : 'none' }}
      cover={<img alt="example" src={food.imageUrl} />}
      onClick={() => addFood(food, date, category)}
    >
      <Meta title={food.name} description={food.timeTaken} />
    </Card>
  );
}

export default FoodCard;
