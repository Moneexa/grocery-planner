import { Col, Row } from 'antd';
import { GroceryItem } from '../../../../types';
import { useMemo } from 'react';
import GroceryCard from './IndividualGrocery';

export default function GroceryGrid({
  groceryIngredient,
}: {
  groceryIngredient: string;
}) {
  const groceryList: GroceryItem[] = useMemo(() => {
    const listGroceries: GroceryItem[] = [];
    for (let i = 1; i < 5; i++) {
      listGroceries.push({
        id: `${i}`,
        name: `${groceryIngredient}${i}`,
        price: `${i * 11}`,
        weight: `${i * 11}`,
        imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      });
    }
    return listGroceries;
  }, [groceryIngredient]);
  return (
    <Row gutter={16}>
      {groceryList.map((groc) => {
        return (
          <Col>
            <GroceryCard
              itemId={groc.id}
              itemName={groc.name}
              itemWeight={groc.weight}
              itemPrice={groc.price}
              itemUrl={groc.imageUrl}
            />
          </Col>
        );
      })}
    </Row>
  );
}
