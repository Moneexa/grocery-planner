import { Col, Row } from 'antd';
import FoodCard from './FoodCard';
import { Recipe } from '../../../../../types';
import { useContext } from 'react';
import { PlanContext } from '../../../../../store/PlanProvider';

import { usePromise } from '../../../../../shared/hooks';
import { searchMeals } from '../../../../../shared/apis';

export default function FoodGrid({
  name,
  category,
  date,
}: {
  name: string;
  category: Exclude<keyof Recipe, 'date'>;
  date: number;
}) {
  const { plan } = useContext(PlanContext);
  const meal = usePromise(
    () => searchMeals(name, category, plan.dietaryPreference),
    [name, category, date],
  );

  return (
    <Row gutter={16}>
      {meal.status === 'loading' && '...loading'}
      {meal.status === 'error' && meal.msg}
      {meal.status === 'success' &&
        meal.data.map((meal, index) => {
          return (
            <Col key={index}>
              <FoodCard food={meal} category={category} date={date} />
            </Col>
          );
        })}
    </Row>
  );
}
