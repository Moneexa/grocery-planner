import { Col, Row } from 'antd';
import { recipes } from '../../../../../constants/recipes';
import FoodCard from './FoodCard';
import { Recipe } from '../../../../../types';

export default function FoodGrid({
  category,
  date,
}: {
  category: Exclude<keyof Recipe, 'date'>;
  date: number;
}) {
  const foodCategory = recipes[category];

  return (
    <Row gutter={16}>
      {foodCategory.map((meal, index) => {
        return (
          <Col key={index}>
            <FoodCard food={meal} category={category} date={date} />
          </Col>
        );
      })}
    </Row>
  );
}
