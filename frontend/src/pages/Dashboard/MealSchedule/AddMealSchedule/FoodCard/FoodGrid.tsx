import { Col, Row } from 'antd';
import { recipes } from '../../../../../constants/recipes';
import FoodCard from './FoodCard';
import { APIResponse, Food, Recipe } from '../../../../../types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { PlanContext } from '../../../../../store/PlanProvider';
import axios from 'axios';

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
  const [meal, setMeal] = useState<APIResponse<Food[]>>({
    status: 'loading',
  });
  useEffect(() => {
    const dietaryApplication = plan.dietaryPreference.map(
      (val) => `&dietary=${val}`,
    );
    axios
      .get(
        `/api/recipe/get-dishes-list?meal_type=${category}&name=${name}${dietaryApplication}`,
      )
      .then((response) => {
        setMeal({ status: 'success', data: response.data });
      })
      .catch((error) => {
        setMeal({ status: 'error', msg: 'Somthing unexpected happened' });
      });
  }, [name, category, date]);

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
